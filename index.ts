#!/usr/bin/env -S deno -q run --allow-run --allow-read --allow-write

import * as Lexer from "./lexer.js";
import { Parser } from "./parser.js";
import { parse } from "https://deno.land/std@0.194.0/flags/mod.ts";

const flags = parse(Deno.args, {
  string: ["proto", "_"],
  default: { proto: "PtKathma" },
});

for (const fn of flags._) {
  const txt = await Deno.readTextFile(fn);
  console.log(`Testing ${fn}`);
  const tezos_protocol = flags.proto;

  const parser = new Parser();

  interface StackElt {
    type: string;
    val: string;
  }

  type Err =
    | { class: "Failed"; val: string }
    | { class: "MutezOverflow"; i: string; j: string }
    | { class: "MutezUnderflow"; i: string; j: string }
    | { class: "GeneralOverflow"; i: string; j: string }
    | { class: "TCError"; detail: TCError };

  type TCError =
    | null
    | { class: "TypeMismatch"; l: string; r: string }
    | { class: "NoMatchingOverload"; instr: string; stack: StackElt[] }
    | { class: "ValueError"; type: string; value: string }
    | { class: "DeadCode"; instr: string }
    | { class: "InvalidInstr"; instr: string };

  interface Res {
    code: string;
    input: StackElt[];
    output: { err: Err } | { stack: StackElt[] };
    amount?: string;
    balance?: string;
    source?: string;
    sender?: string;
    payer?: string;
    self?: string;
    now?: string;
    parameter?: string;
  }

  const res: Res = (parser.parse(Lexer.lex(txt)) as Res[]).reduce(
    (prev, cur) => Object.assign(prev, cur),
    {}
  ) as Res;

  const script_path = await Deno.makeTempFile();

  let input_stack: string;
  let parameter: string;
  let init_code: string;

  if (res.input.length == 0) {
    parameter = res.parameter != null ? res.parameter : "unit";
    init_code = "DROP";
    switch (parameter) {
      case "unit":
        input_stack = "Unit";
        break;
      case "int":
      case "nat":
      case "mutez":
        input_stack = "0";
        break;
      default:
        throw new Error(`Can't make dummy value of type ${parameter}`);
    }
  } else if (res.input.length == 1) {
    parameter = res.input[0].type;
    input_stack = res.input[0].val;
    init_code = "CAR";
  } else {
    parameter = "(pair " + res.input.map(({ type }) => type).join(" ") + ")";
    init_code = `CAR; UNPAIR ${res.input.length}`;
    input_stack = "Pair " + res.input.map(({ val }) => val).join(" ");
  }

  const amount =
    res.amount != null ? ["--amount", formatMutez(res.amount)] : [];
  const balance =
    res.balance != null ? ["--balance", formatMutez(res.balance)] : [];
  const source =
    res.source != null ? ["--source", res.source.replaceAll('"', "")] : [];
  const payer =
    res.payer != null ? ["--payer", res.payer.replaceAll('"', "")] : [];
  const sender =
    res.sender != null ? ["--payer", res.sender.replaceAll('"', "")] : [];
  const self =
    res.self != null ? ["--self-address", res.self.replaceAll('"', "")] : [];
  const now = res.now != null ? ["--now", res.now] : [];
  const extraArgs = [amount, balance, source, payer, self, now, sender];

  if ("stack" in res.output) {
    let storage: string;
    let deinit_code: string;
    let expected_out_val: string;

    for (const i of res.output.stack) {
      // normalisation
      switch (i.type) {
        case "timestamp": {
          const stripped = i.val.replace(/^"|"$/g, "");
          if (stripped.endsWith("Z")) break;
          const intval = parseInt(stripped);
          if (Number.isNaN(intval)) break;
          const timestamp =
            new Date(intval * 1000).toISOString().split(".")[0] + "Z";
          i.val = `"${timestamp}"`;
          break;
        }
      }
    }

    let init_storage: string;

    if (res.output.stack.length == 0) {
      storage = "unit";
      init_storage = "Unit";
      deinit_code = "UNIT";
      expected_out_val = "Unit";
    } else if (res.output.stack.length == 1) {
      storage = `(option ${res.output.stack[0].type})`;
      init_storage = "None";
      deinit_code = "SOME";
      expected_out_val = `(Some ${res.output.stack[0].val})`;
    } else {
      storage =
        "(option (pair " +
        res.output.stack.map(({ type }) => type).join(" ") +
        "))";
      init_storage = "None";
      deinit_code = `PAIR ${res.output.stack.length}; SOME`;
      expected_out_val =
        "(Some (Pair " +
        res.output.stack.map(({ val }) => val).join(" ") +
        "))";
    }

    const code_inner = res.code.trim().length > 0 ? `${res.code};` : "";

    const code = `${init_code}; ${code_inner} ${deinit_code}; NIL operation; PAIR`;

    await Deno.writeTextFile(
      script_path,
      `
parameter ${parameter};
storage ${storage};
code { ${code} };
`
    );

    const args = [
      "--mode",
      "mockup",
      "--protocol",
      tezos_protocol,
      "run",
      "script",
      script_path,
      "on",
      "storage",
      init_storage,
      "and",
      "input",
      input_stack,
    ].concat(...extraArgs);

    const cmd = new Deno.Command("octez-client", {
      args,
    });

    const out = await cmd.output();

    if (out.code !== 0) {
      console.log(new TextDecoder().decode(out.stdout));
      console.log(new TextDecoder().decode(out.stderr));
      throw new Error("Unexpected error");
    }

    const [_, out_val, ..._rest] = new TextDecoder()
      .decode(out.stdout)
      .split("\n");

    const expected_regex = new RegExp(
      `^${expected_out_val
        .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        .replaceAll("_", ".*?")}$`,
      "u"
    );
    if (out_val.trim().match(expected_regex) == null) {
      throw new Error(
        `Expected ${expected_out_val}, but got ${out_val.trim()}`
      );
    }
  } else {
    const code =
      res.output.err?.class == "Failed"
        ? `${init_code}; ${res.code}`
        : `${init_code}; ${res.code}; FAIL`;

    const contract_text = `
parameter ${parameter};
storage unit;
code { ${code} };
`;

    await Deno.writeTextFile(script_path, contract_text);

    const args = [
      "--mode",
      "mockup",
      "--protocol",
      tezos_protocol,
      "run",
      "script",
      script_path,
      "on",
      "storage",
      "Unit",
      "and",
      "input",
      input_stack,
    ].concat(...extraArgs);

    const cmd = new Deno.Command("octez-client", {
      args,
    });

    const out = await cmd.output();

    if (out.code == 0) {
      console.log(new TextDecoder().decode(out.stdout));
      throw new Error("Unexpected success");
    }

    const x = new TextDecoder().decode(out.stderr);

    const out_err = res.output.err;

    let expected_error_line: string | string[];

    switch (out_err.class) {
      case "MutezOverflow": {
        const l = formatMutez(out_err.i);
        const r = formatMutez(out_err.j);
        expected_error_line = `Overflowing addition of ${l} tez and ${r} tez`;
        break;
      }
      case "MutezUnderflow": {
        const l = formatMutez(out_err.i);
        const r = formatMutez(out_err.j);
        expected_error_line = `Underflowing subtraction of ${l} tez and ${r} tez`;
        break;
      }
      case "GeneralOverflow":
        expected_error_line = `unexpected arithmetic overflow`;
        break;
      case "Failed":
        expected_error_line = `script reached FAILWITH instruction
with ${out_err.val}`;
        break;
      case "TCError": {
        const { detail } = out_err;
        switch (detail?.class) {
          case undefined:
            expected_error_line = "Ill typed contract";
            break;
          case "NoMatchingOverload": {
            const args = detail.stack.map((x) => x.type);
            expected_error_line = [
              `operator ${detail.instr} is undefined between ${args.join(
                " and "
              )}`,
              `operator ${detail.instr} is undefined on ${args}`,
              `wrong stack type for instruction ${detail.instr}: [${args}]`,
            ];
            break;
          }
          case "ValueError":
            expected_error_line = `value ${detail.value} is invalid for type ${detail.type}`;
            break;
          case "TypeMismatch":
            expected_error_line = `Type ${detail.l} is not compatible with type ${detail.r}`;
            break;
          case "DeadCode": {
            const match_res = x.match(
              /At line (\d+) characters (\d+) to (\d+),/
            );
            if (!match_res)
              throw new Error("No position information in error message");
            const line = parseInt(match_res[1]);
            const pos1 = parseInt(match_res[2]);
            const pos2 = parseInt(match_res[3]);
            const str = contract_text.split("\n")[line - 1].slice(pos1, pos2);
            if (str !== detail.instr) {
              throw new Error(
                `Expected ${detail.instr}, but the failing instruction is ${str}`
              );
            }
            expected_error_line =
              "The FAIL instruction must appear in a tail position";
            break;
          }
          case "InvalidInstr":
            switch (detail.instr) {
              case "PAIR":
                expected_error_line = "PAIR expects an argument of at least 2";
                break;
              case "DUP":
                expected_error_line = "DUP n expects an argument of at least 1";
                break;
              case "SELF":
                expected_error_line =
                  "The SELF instruction cannot appear in a lambda.";
                break;
              default:
                throw new Error(
                  `Unhandled invalid instruction: ${detail.instr}`
                );
            }
            break;
          default:
            unreachable(
              detail,
              `Unknown typechecker error: ${JSON.stringify(out_err.detail)}`
            );
        }
        break;
      }
      default:
        unreachable(out_err, `Unknown error: ${JSON.stringify(out_err)}`);
    }

    const x_oneline = x.replace(/\s+/g, ' ');

    if (Array.isArray(expected_error_line)) {
      if (!expected_error_line.some((y) => x_oneline.includes(y))) {
        console.log(x);
        throw new Error(
          `Could not find ${expected_error_line.join(" or ")} in output`
        );
      }
    } else {
      if (!x_oneline.includes(expected_error_line)) {
        console.log(x);
        throw new Error(`Could not find ${expected_error_line} in output`);
      }
    }
  }
}

function formatMutez(s: string) {
  if (s.length > 6) {
    return s.slice(0, -6) + "." + s.slice(-6);
  } else {
    return "0." + s.padStart(6, "0");
  }
}

function unreachable(_: never, msg: string): never {
  throw new Error(msg);
}
