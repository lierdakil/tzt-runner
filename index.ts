#!/usr/bin/env -S deno -q run --allow-run --allow-read --allow-write

const TEZOS_PROTOCOL = "PtKathma";

import * as Lexer from "./lexer.js";
import { Parser } from "./parser.js";

const txt = await Deno.readTextFile(Deno.args[0]);

const parser = new Parser();

interface StackElt {
  type: string;
  val: string;
}

interface Res {
  code: string;
  input: StackElt[];
  output: { err: string } | { stack: StackElt[] };
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

const amount = res.amount != null ? ["--amount", formatMutez(res.amount)] : [];
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
      "(Some (Pair " + res.output.stack.map(({ val }) => val).join(" ") + "))";
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
    TEZOS_PROTOCOL,
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

  if (out_val.trim() !== expected_out_val) {
    throw new Error(`Expected ${expected_out_val}, but got ${out_val.trim()}`);
  }
} else {
  const code = res.output.err.startsWith("Failed ")
    ? `${init_code}; ${res.code}`
    : `${init_code}; ${res.code}; FAIL`;

  await Deno.writeTextFile(
    script_path,
    `
parameter ${parameter};
storage unit;
code { ${code} };
`
  );

  const args = [
    "--mode",
    "mockup",
    "--protocol",
    TEZOS_PROTOCOL,
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

  const out_err = res.output.err.split(" ");

  let expected_error_line: string;

  switch (out_err[0]) {
    case "MutezOverflow": {
      const l = formatMutez(out_err[1]);
      const r = formatMutez(out_err[2]);
      expected_error_line = `Overflowing addition of ${l} tez and ${r} tez`;
      break;
    }
    case "MutezUnderflow": {
      const l = formatMutez(out_err[1]);
      const r = formatMutez(out_err[2]);
      expected_error_line = `Underflowing subtraction of ${l} tez and ${r} tez`;
      break;
    }
    case "GeneralOverflow":
      expected_error_line = `unexpected arithmetic overflow`;
      break;
    case "Failed":
      expected_error_line = `script reached FAILWITH instruction
with ${out_err[1]}`;
      break;
    default:
      throw new Error(`Unknown error: ${out_err}`);
  }

  if (!x.includes(expected_error_line)) {
    console.log(x);
    throw new Error(`Could not find ${expected_error_line} in output`);
  }
}

function formatMutez(s: string) {
  if (s.length > 6) {
    return s.slice(0, -6) + "." + s.slice(-6);
  } else {
    return "0." + s.padStart(6, "0");
  }
}
