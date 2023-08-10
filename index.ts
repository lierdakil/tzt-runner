#!/usr/bin/env -S deno -q run --allow-run --allow-read --allow-write

import * as Lexer from "./lexer.js";
import { Parser } from "./parser.js";
import { parse } from "https://deno.land/std@0.194.0/flags/mod.ts";
import PQueue from "https://deno.land/x/p_queue@1.0.1/mod.ts";

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
  | { class: "InvalidInstr"; instr: string }
  | { class: "BadType"; type: string };

interface Res {
  code: string;
  input: StackElt[];
  output: { err: Err } | { stack: StackElt[] };
  amount?: string;
  balance?: string;
  source?: string;
  sender?: string;
  self?: string;
  now?: string;
  parameter?: string;
  big_maps?: string[];
}

const flags = parse(Deno.args, {
  string: ["proto", "_", "jobs"],
  boolean: ["tc_only", "hide_successes", "debug"],
  default: {
    proto: "PtKathma",
    jobs: "1",
    tc_only: false,
    hide_successes: false,
  },
});

const queue = new PQueue({
  concurrency: parseInt(flags.jobs),
  autoStart: true,
});

for (const fn of flags._) {
  queue.add(() => process(fn));
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

async function process(fn: string) {
  const output: string[] = [];
  function log(str: string) {
    output.push(str);
  }
  const tc_only = fn.endsWith(".tc.tzt") && flags.tc_only;
  const tc_only_flag = tc_only ? "[only tc] " : "";
  try {
    const txt = await Deno.readTextFile(fn);
    const tezos_protocol = flags.proto;

    const parser = new Parser();

    const res: Res = (parser.parse(Lexer.lex(txt)) as Res[]).reduce(
      (prev, cur) => Object.assign(prev, cur),
      {}
    ) as Res;

    const big_maps = new Map(
      res.big_maps?.map((x) => {
        const m = x.trim().match(/^Big_map\s+(\d+).*\{(.*)\}/);
        if (!m) throw new Error(`Incorrect big_map syntax`);
        const [_, num, content] = m;
        return [num, content];
      })
    );

    res.input = res.input.map(({ type, val }) => {
      if (trimParens(type).startsWith("big_map")) {
        const new_val = big_maps.get(val.trim());
        return { type, val: new_val != null ? `{ ${new_val} }` : val };
      } else {
        return { type, val };
      }
    });

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
    const payer =
      res.source != null ? ["--payer", res.source.replaceAll('"', "")] : [];
    const sender =
      res.sender != null ? ["--source", res.sender.replaceAll('"', "")] : [];
    const self =
      res.self != null ? ["--self-address", res.self.replaceAll('"', "")] : [];
    const now = res.now != null ? ["--now", res.now] : [];
    const extraArgs = [
      amount,
      balance,
      payer,
      self,
      now,
      sender,
    ].flat();

    let init_storage: string;

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

      const out = await runOctezClient({
        code,
        extraArgs,
        init_storage,
        input_stack,
        parameter,
        storage,
        tc_only,
        tezos_protocol,
        debug: flags.debug,
      });

      if (out.code !== 0) {
        log(out.stdout);
        log(out.stderr);
        throw new Error("Unexpected error");
      }

      const [_, out_val, ..._rest] = out.stdout.split("\n");

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

      const out = await runOctezClient({
        code,
        extraArgs,
        init_storage: "Unit",
        input_stack,
        parameter,
        storage: "unit",
        tc_only,
        tezos_protocol,
        debug: flags.debug,
      });

      if (out.code == 0) {
        log(out.stdout);
        throw new Error("Unexpected success");
      }

      const x = out.stderr;

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
          expected_error_line = `script reached FAILWITH instruction with ${out_err.val}`;
          break;
        case "TCError": {
          const { detail } = out_err;
          switch (detail?.class) {
            case undefined:
              expected_error_line = "Ill typed contract";
              break;
            case "NoMatchingOverload": {
              const args = detail.stack;
              if (detail.instr == "BYTES" || detail.instr == "NAT") {
                // Like, seriously, WTF?
                expected_error_line = `invalid primitive ${detail.instr}`;
              } else {
                expected_error_line = [
                  `operator ${detail.instr} is undefined between ${args.join(
                    " and "
                  )}`,
                  `operator ${detail.instr} is undefined on ${args}`,
                  `wrong stack type for instruction ${detail.instr}: []`,
                  `wrong stack type for instruction ${detail.instr}: [${args}`,
                ];
              }
              break;
            }
            case "ValueError":
              expected_error_line = `value ${
                detail.value
              } is invalid for type ${trimParens(detail.type)}`;
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
              const str = out.contract_text
                .split("\n")
                [line - 1].slice(pos1, pos2);
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
                  expected_error_line =
                    "PAIR expects an argument of at least 2";
                  break;
                case "UNPAIR":
                  expected_error_line =
                    "UNPAIR expects an argument of at least 2";
                  break;
                case "DUP":
                  expected_error_line =
                    "DUP n expects an argument of at least 1";
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
            case "BadType": {
              const ty = trimParens(detail.type);
              if (ty.startsWith("contract")) {
                expected_error_line = "contract type forbidden";
              } else if (
                ty.startsWith("big_map") ||
                ty.startsWith("sapling_state")
              ) {
                expected_error_line =
                  "big_map or sapling_state type not expected";
              } else {
                expected_error_line = [
                  `${detail.type} type not expected`,
                  `${detail.type} type forbidden`,
                ];
              }
              break;
            }
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

      const x_oneline = x.replace(/\s+/g, " ");

      if (Array.isArray(expected_error_line)) {
        if (!expected_error_line.some((y) => x_oneline.includes(y))) {
          log(x);
          throw new Error(
            `Could not find ${expected_error_line.join(" or ")} in output`
          );
        }
      } else {
        if (!x_oneline.includes(expected_error_line)) {
          log(x);
          throw new Error(`Could not find ${expected_error_line} in output`);
        }
      }
    }
    if (!flags.hide_successes) {
      console.log(`${tc_only_flag}${fn} %c✔`, "color: green");
    }
    if (output.length > 0) {
      Deno.stdout.writeSync(new TextEncoder().encode(output.join("\n") + "\n"));
    }
  } catch (e) {
    console.log(`${tc_only_flag}${fn} %c❌`, "color: red");
    if (output.length > 0) {
      Deno.stdout.writeSync(new TextEncoder().encode(output.join("\n") + "\n"));
    }
    console.error(e);
  }
}

function trimParens(str: string): string {
  const t = str.trim().match(/^\((.*)\)$/);
  if (t != null) {
    return trimParens(t[1]);
  } else {
    return str;
  }
}

interface OctezClientParams {
  parameter: string;
  storage: string;
  code: string;
  tc_only: boolean;
  tezos_protocol: string;
  init_storage: string;
  input_stack: string;
  extraArgs: string[];
  debug: boolean;
}

interface OctezResult {
  contract_text: string;
  stdout: string;
  stderr: string;
  code: number;
}

async function runOctezClient(p: OctezClientParams): Promise<OctezResult> {
  const contract_text = `
parameter ${p.parameter};
storage ${p.storage};
code { ${p.code} };
`;
  const script = `text:${contract_text}`;

  const args = p.tc_only
    ? [
        "--mode",
        "mockup",
        "--protocol",
        p.tezos_protocol,
        "typecheck",
        "script",
        script,
      ]
    : [
        "--mode",
        "mockup",
        "--protocol",
        p.tezos_protocol,
        "run",
        "script",
        script,
        "on",
        "storage",
        p.init_storage,
        "and",
        "input",
        p.input_stack,
      ].concat(...p.extraArgs);

  const cmd = new Deno.Command("octez-client", {
    args,
  });

  const out = await cmd.output();
  const stdout = new TextDecoder().decode(out.stdout);
  const stderr = new TextDecoder().decode(out.stderr);
  if (p.debug) {
    console.log(out.stdout);
    console.log(out.stderr);
  }
  return { contract_text, stdout, stderr, code: out.code };
}
