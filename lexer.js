'use strict'

export const TokenType = {
  eof: 0,
  Tok_word: 1,
  Tok_underscore: 2,
  Tok_semi: 3,
  Tok_colon: 4,
  Tok_comma: 5,
  Tok_lbr: 6,
  Tok_rbr: 7,
  Tok_lp: 8,
  Tok_rp: 9,
  Tok_invalidInstr: 10,
  Tok_badType: 11,
  Tok_deadCode: 12,
  Tok_valueError: 13,
  Tok_noMatchingOverload: 14,
  Tok_typeMismatch: 15,
  Tok_stack_elt: 16,
  Tok_stackMismatch: 17,
  Tok_tcError: 18,
  Tok_generalOverflow: 19,
  Tok_mutezUnderflow: 20,
  Tok_mutezOverflow: 21,
  Tok_failed: 22,
  Tok_parameter: 23,
  Tok_source: 24,
  Tok_sender: 25,
  Tok_self: 26,
  Tok_now: 27,
  Tok_big_maps: 28,
  Tok_balance: 29,
  Tok_amount: 30,
  Tok_other_contracts: 31,
  Tok_output: 32,
  Tok_input: 33,
  Tok_chain_id: 34,
  Tok_code: 35
}

export function tokToStr(x) {
  switch(x) {
    case 0: return '%eof'
    case 1: return 'word'
    case 2: return 'underscore'
    case 3: return 'semi'
    case 4: return 'colon'
    case 5: return 'comma'
    case 6: return 'lbr'
    case 7: return 'rbr'
    case 8: return 'lp'
    case 9: return 'rp'
    case 10: return 'invalidInstr'
    case 11: return 'badType'
    case 12: return 'deadCode'
    case 13: return 'valueError'
    case 14: return 'noMatchingOverload'
    case 15: return 'typeMismatch'
    case 16: return 'stack_elt'
    case 17: return 'stackMismatch'
    case 18: return 'tcError'
    case 19: return 'generalOverflow'
    case 20: return 'mutezUnderflow'
    case 21: return 'mutezOverflow'
    case 22: return 'failed'
    case 23: return 'parameter'
    case 24: return 'source'
    case 25: return 'sender'
    case 26: return 'self'
    case 27: return 'now'
    case 28: return 'big_maps'
    case 29: return 'balance'
    case 30: return 'amount'
    case 31: return 'other_contracts'
    case 32: return 'output'
    case 33: return 'input'
    case 34: return 'chain_id'
    case 35: return 'code'
  }
}

class Buf {
  constructor(it) {
    this.current = it[Symbol.iterator]()
    this.stack = []
  }

  [Symbol.iterator]() {
    return this
  }

  next() {
    if (this.current === null) {
      return {done: true}
    }
    const res = this.current.next()
    if (res.done) {
      if (this.stack.length) {
        this.current = this.stack.pop()
        return this.next()
      } else {
        this.current = null
      }
    }
    return res
  }

  empty() {
    return this.current === null
  }

  unshift(it) {
    this.stack.push(this.current)
    this.current = it[Symbol.iterator]()
  }
}

export function *lex(input, debug = false) {
  const inputBuf = new Buf(input)

  while(true) {
    let curCh = '\0'
    let accSt = -1
    let curSt = 0
    let buf = ""
    let tmp = ""
    while (curSt >= 0) {
      if ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,30,31,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200,201,202,203,204,205,206,207,208,209,210,211,212,213,214,215,216,217,218,219,220,221,222,223,224,225,226,227,228,229,230,231,232].includes(curSt)) {
        buf += tmp
        tmp = ""
        accSt = curSt
      }
      if ([].includes(curSt)) {
        break
      }
      const t = inputBuf.next()
      if (t.done) break
      curCh = t.value
      tmp += curCh
      switch(curSt) {
      case 0:
        if (curCh === '\u{00000009}' || curCh === '\u{0000000a}' || curCh === '\u{0000000d}' || curCh === ' ') {
          curSt = 1
          continue
        } else if (curCh === '#') {
          curSt = 2
          continue
        } else if (curCh === 'c') {
          curSt = 3
          continue
        } else if (curCh === 'i') {
          curSt = 4
          continue
        } else if (curCh === 'o') {
          curSt = 5
          continue
        } else if (curCh === 'a') {
          curSt = 6
          continue
        } else if (curCh === 'b') {
          curSt = 7
          continue
        } else if (curCh === 'n') {
          curSt = 8
          continue
        } else if (curCh === 's') {
          curSt = 9
          continue
        } else if (curCh === 'p') {
          curSt = 10
          continue
        } else if (curCh === 'F') {
          curSt = 11
          continue
        } else if (curCh === 'M') {
          curSt = 12
          continue
        } else if (curCh === 'G') {
          curSt = 13
          continue
        } else if (curCh === 'S') {
          curSt = 14
          continue
        } else if (curCh === '_') {
          curSt = 15
          continue
        } else if (curCh === 'T') {
          curSt = 16
          continue
        } else if (curCh === 'N') {
          curSt = 17
          continue
        } else if (curCh === 'V') {
          curSt = 18
          continue
        } else if (curCh === 'D') {
          curSt = 19
          continue
        } else if (curCh === 'B') {
          curSt = 20
          continue
        } else if (curCh === 'I') {
          curSt = 21
          continue
        } else if (curCh === ';') {
          curSt = 22
          continue
        } else if (curCh === ':') {
          curSt = 23
          continue
        } else if (curCh === ',') {
          curSt = 24
          continue
        } else if (curCh === '{') {
          curSt = 25
          continue
        } else if (curCh === '}') {
          curSt = 26
          continue
        } else if (curCh === '(') {
          curSt = 27
          continue
        } else if (curCh === ')') {
          curSt = 28
          continue
        } else if (curCh === '"') {
          curSt = 29
          continue
        } else if (curCh === '-' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 2:
        if (!(curCh === '\u{0000000a}')) {
          curSt = 2
          continue
        }
        break
      case 3:
        if (curCh === 'o') {
          curSt = 223
          continue
        } else if (curCh === 'h') {
          curSt = 224
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 4:
        if (curCh === 'n') {
          curSt = 219
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 5:
        if (curCh === 'u') {
          curSt = 200
          continue
        } else if (curCh === 't') {
          curSt = 201
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 6:
        if (curCh === 'm') {
          curSt = 195
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 7:
        if (curCh === 'a') {
          curSt = 182
          continue
        } else if (curCh === 'i') {
          curSt = 183
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 8:
        if (curCh === 'o') {
          curSt = 180
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 9:
        if (curCh === 'e') {
          curSt = 168
          continue
        } else if (curCh === 'o') {
          curSt = 169
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 10:
        if (curCh === 'a') {
          curSt = 160
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 11:
        if (curCh === 'a') {
          curSt = 155
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 12:
        if (curCh === 'u') {
          curSt = 134
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 13:
        if (curCh === 'e') {
          curSt = 120
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 14:
        if (curCh === 't') {
          curSt = 96
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 15:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 16:
        if (curCh === 'y') {
          curSt = 85
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 17:
        if (curCh === 'o') {
          curSt = 68
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 18:
        if (curCh === 'a') {
          curSt = 59
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 19:
        if (curCh === 'e') {
          curSt = 52
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 20:
        if (curCh === 'a') {
          curSt = 46
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 21:
        if (curCh === 'n') {
          curSt = 35
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 29:
        if (curCh === '"') {
          curSt = 31
          continue
        } else if (curCh === '\\') {
          curSt = 32
          continue
        } else if (!(curCh === '\\' || curCh === '"')) {
          curSt = 29
          continue
        }
        break
      case 30:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 32:
        if (true) {
          curSt = 29
          continue
        }
        break
      case 35:
        if (curCh === 'v') {
          curSt = 36
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 36:
        if (curCh === 'a') {
          curSt = 37
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 37:
        if (curCh === 'l') {
          curSt = 38
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 38:
        if (curCh === 'i') {
          curSt = 39
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 39:
        if (curCh === 'd') {
          curSt = 40
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 40:
        if (curCh === 'I') {
          curSt = 41
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 41:
        if (curCh === 'n') {
          curSt = 42
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 42:
        if (curCh === 's') {
          curSt = 43
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 43:
        if (curCh === 't') {
          curSt = 44
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 44:
        if (curCh === 'r') {
          curSt = 45
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 45:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 46:
        if (curCh === 'd') {
          curSt = 47
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 47:
        if (curCh === 'T') {
          curSt = 48
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 48:
        if (curCh === 'y') {
          curSt = 49
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 49:
        if (curCh === 'p') {
          curSt = 50
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 50:
        if (curCh === 'e') {
          curSt = 51
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 51:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 52:
        if (curCh === 'a') {
          curSt = 53
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 53:
        if (curCh === 'd') {
          curSt = 54
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 54:
        if (curCh === 'C') {
          curSt = 55
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 55:
        if (curCh === 'o') {
          curSt = 56
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 56:
        if (curCh === 'd') {
          curSt = 57
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 57:
        if (curCh === 'e') {
          curSt = 58
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 58:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 59:
        if (curCh === 'l') {
          curSt = 60
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 60:
        if (curCh === 'u') {
          curSt = 61
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 61:
        if (curCh === 'e') {
          curSt = 62
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 62:
        if (curCh === 'E') {
          curSt = 63
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 63:
        if (curCh === 'r') {
          curSt = 64
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 64:
        if (curCh === 'r') {
          curSt = 65
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 65:
        if (curCh === 'o') {
          curSt = 66
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 66:
        if (curCh === 'r') {
          curSt = 67
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 67:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 68:
        if (curCh === 'M') {
          curSt = 69
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 69:
        if (curCh === 'a') {
          curSt = 70
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 70:
        if (curCh === 't') {
          curSt = 71
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 71:
        if (curCh === 'c') {
          curSt = 72
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 72:
        if (curCh === 'h') {
          curSt = 73
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 73:
        if (curCh === 'i') {
          curSt = 74
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 74:
        if (curCh === 'n') {
          curSt = 75
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 75:
        if (curCh === 'g') {
          curSt = 76
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 76:
        if (curCh === 'O') {
          curSt = 77
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 77:
        if (curCh === 'v') {
          curSt = 78
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 78:
        if (curCh === 'e') {
          curSt = 79
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 79:
        if (curCh === 'r') {
          curSt = 80
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 80:
        if (curCh === 'l') {
          curSt = 81
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 81:
        if (curCh === 'o') {
          curSt = 82
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 82:
        if (curCh === 'a') {
          curSt = 83
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 83:
        if (curCh === 'd') {
          curSt = 84
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 84:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 85:
        if (curCh === 'p') {
          curSt = 86
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 86:
        if (curCh === 'e') {
          curSt = 87
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 87:
        if (curCh === 'M') {
          curSt = 88
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 88:
        if (curCh === 'i') {
          curSt = 89
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 89:
        if (curCh === 's') {
          curSt = 90
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 90:
        if (curCh === 'm') {
          curSt = 91
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 91:
        if (curCh === 'a') {
          curSt = 92
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 92:
        if (curCh === 't') {
          curSt = 93
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 93:
        if (curCh === 'c') {
          curSt = 94
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 94:
        if (curCh === 'h') {
          curSt = 95
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 95:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 96:
        if (curCh === 'a') {
          curSt = 97
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 97:
        if (curCh === 't') {
          curSt = 98
          continue
        } else if (curCh === 'c') {
          curSt = 99
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 98:
        if (curCh === 'i') {
          curSt = 113
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 99:
        if (curCh === 'k') {
          curSt = 100
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 100:
        if (curCh === 'M') {
          curSt = 101
          continue
        } else if (curCh === '_') {
          curSt = 102
          continue
        } else if (curCh === '-' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 101:
        if (curCh === 'i') {
          curSt = 106
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 102:
        if (curCh === 'e') {
          curSt = 103
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 103:
        if (curCh === 'l') {
          curSt = 104
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 104:
        if (curCh === 't') {
          curSt = 105
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 105:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 106:
        if (curCh === 's') {
          curSt = 107
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 107:
        if (curCh === 'm') {
          curSt = 108
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 108:
        if (curCh === 'a') {
          curSt = 109
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 109:
        if (curCh === 't') {
          curSt = 110
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 110:
        if (curCh === 'c') {
          curSt = 111
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 111:
        if (curCh === 'h') {
          curSt = 112
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 112:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 113:
        if (curCh === 'c') {
          curSt = 114
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 114:
        if (curCh === 'E') {
          curSt = 115
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 115:
        if (curCh === 'r') {
          curSt = 116
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 116:
        if (curCh === 'r') {
          curSt = 117
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 117:
        if (curCh === 'o') {
          curSt = 118
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 118:
        if (curCh === 'r') {
          curSt = 119
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 119:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 120:
        if (curCh === 'n') {
          curSt = 121
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 121:
        if (curCh === 'e') {
          curSt = 122
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 122:
        if (curCh === 'r') {
          curSt = 123
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 123:
        if (curCh === 'a') {
          curSt = 124
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 124:
        if (curCh === 'l') {
          curSt = 125
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 125:
        if (curCh === 'O') {
          curSt = 126
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 126:
        if (curCh === 'v') {
          curSt = 127
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 127:
        if (curCh === 'e') {
          curSt = 128
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 128:
        if (curCh === 'r') {
          curSt = 129
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 129:
        if (curCh === 'f') {
          curSt = 130
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 130:
        if (curCh === 'l') {
          curSt = 131
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 131:
        if (curCh === 'o') {
          curSt = 132
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 132:
        if (curCh === 'w') {
          curSt = 133
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 133:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 134:
        if (curCh === 't') {
          curSt = 135
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 135:
        if (curCh === 'e') {
          curSt = 136
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 136:
        if (curCh === 'z') {
          curSt = 137
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 137:
        if (curCh === 'O') {
          curSt = 138
          continue
        } else if (curCh === 'U') {
          curSt = 139
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 138:
        if (curCh === 'v') {
          curSt = 148
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 139:
        if (curCh === 'n') {
          curSt = 140
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 140:
        if (curCh === 'd') {
          curSt = 141
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 141:
        if (curCh === 'e') {
          curSt = 142
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 142:
        if (curCh === 'r') {
          curSt = 143
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 143:
        if (curCh === 'f') {
          curSt = 144
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 144:
        if (curCh === 'l') {
          curSt = 145
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 145:
        if (curCh === 'o') {
          curSt = 146
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 146:
        if (curCh === 'w') {
          curSt = 147
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 147:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 148:
        if (curCh === 'e') {
          curSt = 149
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 149:
        if (curCh === 'r') {
          curSt = 150
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 150:
        if (curCh === 'f') {
          curSt = 151
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 151:
        if (curCh === 'l') {
          curSt = 152
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 152:
        if (curCh === 'o') {
          curSt = 153
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 153:
        if (curCh === 'w') {
          curSt = 154
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 154:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 155:
        if (curCh === 'i') {
          curSt = 156
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 156:
        if (curCh === 'l') {
          curSt = 157
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 157:
        if (curCh === 'e') {
          curSt = 158
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 158:
        if (curCh === 'd') {
          curSt = 159
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 159:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 160:
        if (curCh === 'r') {
          curSt = 161
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 161:
        if (curCh === 'a') {
          curSt = 162
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 162:
        if (curCh === 'm') {
          curSt = 163
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 163:
        if (curCh === 'e') {
          curSt = 164
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 164:
        if (curCh === 't') {
          curSt = 165
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 165:
        if (curCh === 'e') {
          curSt = 166
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 166:
        if (curCh === 'r') {
          curSt = 167
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 167:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 168:
        if (curCh === 'l') {
          curSt = 174
          continue
        } else if (curCh === 'n') {
          curSt = 175
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 169:
        if (curCh === 'u') {
          curSt = 170
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 170:
        if (curCh === 'r') {
          curSt = 171
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 171:
        if (curCh === 'c') {
          curSt = 172
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 172:
        if (curCh === 'e') {
          curSt = 173
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 173:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 174:
        if (curCh === 'f') {
          curSt = 179
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 175:
        if (curCh === 'd') {
          curSt = 176
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 176:
        if (curCh === 'e') {
          curSt = 177
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 177:
        if (curCh === 'r') {
          curSt = 178
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 178:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 179:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 180:
        if (curCh === 'w') {
          curSt = 181
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 181:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 182:
        if (curCh === 'l') {
          curSt = 190
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 183:
        if (curCh === 'g') {
          curSt = 184
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 184:
        if (curCh === '_') {
          curSt = 185
          continue
        } else if (curCh === '-' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 185:
        if (curCh === 'm') {
          curSt = 186
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 186:
        if (curCh === 'a') {
          curSt = 187
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 187:
        if (curCh === 'p') {
          curSt = 188
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 188:
        if (curCh === 's') {
          curSt = 189
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 189:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 190:
        if (curCh === 'a') {
          curSt = 191
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 191:
        if (curCh === 'n') {
          curSt = 192
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 192:
        if (curCh === 'c') {
          curSt = 193
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 193:
        if (curCh === 'e') {
          curSt = 194
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 194:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 195:
        if (curCh === 'o') {
          curSt = 196
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 196:
        if (curCh === 'u') {
          curSt = 197
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 197:
        if (curCh === 'n') {
          curSt = 198
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 198:
        if (curCh === 't') {
          curSt = 199
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 199:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 200:
        if (curCh === 't') {
          curSt = 215
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 201:
        if (curCh === 'h') {
          curSt = 202
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 202:
        if (curCh === 'e') {
          curSt = 203
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 203:
        if (curCh === 'r') {
          curSt = 204
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 204:
        if (curCh === '_') {
          curSt = 205
          continue
        } else if (curCh === '-' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 205:
        if (curCh === 'c') {
          curSt = 206
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 206:
        if (curCh === 'o') {
          curSt = 207
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 207:
        if (curCh === 'n') {
          curSt = 208
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 208:
        if (curCh === 't') {
          curSt = 209
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 209:
        if (curCh === 'r') {
          curSt = 210
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 210:
        if (curCh === 'a') {
          curSt = 211
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 211:
        if (curCh === 'c') {
          curSt = 212
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 212:
        if (curCh === 't') {
          curSt = 213
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 213:
        if (curCh === 's') {
          curSt = 214
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 214:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 215:
        if (curCh === 'p') {
          curSt = 216
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 216:
        if (curCh === 'u') {
          curSt = 217
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 217:
        if (curCh === 't') {
          curSt = 218
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 218:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 219:
        if (curCh === 'p') {
          curSt = 220
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 220:
        if (curCh === 'u') {
          curSt = 221
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 221:
        if (curCh === 't') {
          curSt = 222
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 222:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 223:
        if (curCh === 'd') {
          curSt = 231
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 224:
        if (curCh === 'a') {
          curSt = 225
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 225:
        if (curCh === 'i') {
          curSt = 226
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 226:
        if (curCh === 'n') {
          curSt = 227
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 227:
        if (curCh === '_') {
          curSt = 228
          continue
        } else if (curCh === '-' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 228:
        if (curCh === 'i') {
          curSt = 229
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 229:
        if (curCh === 'd') {
          curSt = 230
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 230:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 231:
        if (curCh === 'e') {
          curSt = 232
          continue
        } else if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      case 232:
        if (curCh === '-' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 30
          continue
        }
        break
      }
      break
    }

    if (tmp.length > 0) {
      inputBuf.unshift(tmp)
    }
    const text = buf
    switch(accSt) {
      case 1:
        if (debug) console.log("Skipping state 1: \"" + text + "\"")
        continue
      case 2:
        if (debug) console.log("Skipping state 2: \"" + text + "\"")
        continue
      case 3:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 4:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 5:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 6:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 7:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 8:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 9:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 10:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 11:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 12:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 13:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 14:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 15:
        if (debug) console.log("Lexed token underscore: \"" + text + "\"")
        yield [TokenType.Tok_underscore, text]
        continue
      case 16:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 17:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 18:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 19:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 20:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 21:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 22:
        if (debug) console.log("Lexed token semi: \"" + text + "\"")
        yield [TokenType.Tok_semi, null]
        continue
      case 23:
        if (debug) console.log("Lexed token colon: \"" + text + "\"")
        yield [TokenType.Tok_colon, null]
        continue
      case 24:
        if (debug) console.log("Lexed token comma: \"" + text + "\"")
        yield [TokenType.Tok_comma, null]
        continue
      case 25:
        if (debug) console.log("Lexed token lbr: \"" + text + "\"")
        yield [TokenType.Tok_lbr, null]
        continue
      case 26:
        if (debug) console.log("Lexed token rbr: \"" + text + "\"")
        yield [TokenType.Tok_rbr, null]
        continue
      case 27:
        if (debug) console.log("Lexed token lp: \"" + text + "\"")
        yield [TokenType.Tok_lp, text]
        continue
      case 28:
        if (debug) console.log("Lexed token rp: \"" + text + "\"")
        yield [TokenType.Tok_rp, text]
        continue
      case 30:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 31:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 35:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 36:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 37:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 38:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 39:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 40:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 41:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 42:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 43:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 44:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 45:
        if (debug) console.log("Lexed token invalidInstr: \"" + text + "\"")
        yield [TokenType.Tok_invalidInstr, text]
        continue
      case 46:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 47:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 48:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 49:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 50:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 51:
        if (debug) console.log("Lexed token badType: \"" + text + "\"")
        yield [TokenType.Tok_badType, text]
        continue
      case 52:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 53:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 54:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 55:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 56:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 57:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 58:
        if (debug) console.log("Lexed token deadCode: \"" + text + "\"")
        yield [TokenType.Tok_deadCode, text]
        continue
      case 59:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 60:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 61:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 62:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 63:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 64:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 65:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 66:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 67:
        if (debug) console.log("Lexed token valueError: \"" + text + "\"")
        yield [TokenType.Tok_valueError, text]
        continue
      case 68:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 69:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 70:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 71:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 72:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 73:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 74:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 75:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 76:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 77:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 78:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 79:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 80:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 81:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 82:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 83:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 84:
        if (debug) console.log("Lexed token noMatchingOverload: \"" + text + "\"")
        yield [TokenType.Tok_noMatchingOverload, text]
        continue
      case 85:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 86:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 87:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 88:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 89:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 90:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 91:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 92:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 93:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 94:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 95:
        if (debug) console.log("Lexed token typeMismatch: \"" + text + "\"")
        yield [TokenType.Tok_typeMismatch, text]
        continue
      case 96:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 97:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 98:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 99:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 100:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 101:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 102:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 103:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 104:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 105:
        if (debug) console.log("Lexed token stack_elt: \"" + text + "\"")
        yield [TokenType.Tok_stack_elt, null]
        continue
      case 106:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 107:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 108:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 109:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 110:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 111:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 112:
        if (debug) console.log("Lexed token stackMismatch: \"" + text + "\"")
        yield [TokenType.Tok_stackMismatch, text]
        continue
      case 113:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 114:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 115:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 116:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 117:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 118:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 119:
        if (debug) console.log("Lexed token tcError: \"" + text + "\"")
        yield [TokenType.Tok_tcError, text]
        continue
      case 120:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 121:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 122:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 123:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 124:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 125:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 126:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 127:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 128:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 129:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 130:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 131:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 132:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 133:
        if (debug) console.log("Lexed token generalOverflow: \"" + text + "\"")
        yield [TokenType.Tok_generalOverflow, text]
        continue
      case 134:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 135:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 136:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 137:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 138:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 139:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 140:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 141:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 142:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 143:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 144:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 145:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 146:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 147:
        if (debug) console.log("Lexed token mutezUnderflow: \"" + text + "\"")
        yield [TokenType.Tok_mutezUnderflow, text]
        continue
      case 148:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 149:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 150:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 151:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 152:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 153:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 154:
        if (debug) console.log("Lexed token mutezOverflow: \"" + text + "\"")
        yield [TokenType.Tok_mutezOverflow, text]
        continue
      case 155:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 156:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 157:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 158:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 159:
        if (debug) console.log("Lexed token failed: \"" + text + "\"")
        yield [TokenType.Tok_failed, text]
        continue
      case 160:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 161:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 162:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 163:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 164:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 165:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 166:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 167:
        if (debug) console.log("Lexed token parameter: \"" + text + "\"")
        yield [TokenType.Tok_parameter, text]
        continue
      case 168:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 169:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 170:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 171:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 172:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 173:
        if (debug) console.log("Lexed token source: \"" + text + "\"")
        yield [TokenType.Tok_source, text]
        continue
      case 174:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 175:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 176:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 177:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 178:
        if (debug) console.log("Lexed token sender: \"" + text + "\"")
        yield [TokenType.Tok_sender, text]
        continue
      case 179:
        if (debug) console.log("Lexed token self: \"" + text + "\"")
        yield [TokenType.Tok_self, text]
        continue
      case 180:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 181:
        if (debug) console.log("Lexed token now: \"" + text + "\"")
        yield [TokenType.Tok_now, text]
        continue
      case 182:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 183:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 184:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 185:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 186:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 187:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 188:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 189:
        if (debug) console.log("Lexed token big_maps: \"" + text + "\"")
        yield [TokenType.Tok_big_maps, text]
        continue
      case 190:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 191:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 192:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 193:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 194:
        if (debug) console.log("Lexed token balance: \"" + text + "\"")
        yield [TokenType.Tok_balance, text]
        continue
      case 195:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 196:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 197:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 198:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 199:
        if (debug) console.log("Lexed token amount: \"" + text + "\"")
        yield [TokenType.Tok_amount, text]
        continue
      case 200:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 201:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 202:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 203:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 204:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 205:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 206:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 207:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 208:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 209:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 210:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 211:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 212:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 213:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 214:
        if (debug) console.log("Lexed token other_contracts: \"" + text + "\"")
        yield [TokenType.Tok_other_contracts, text]
        continue
      case 215:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 216:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 217:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 218:
        if (debug) console.log("Lexed token output: \"" + text + "\"")
        yield [TokenType.Tok_output, text]
        continue
      case 219:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 220:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 221:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 222:
        if (debug) console.log("Lexed token input: \"" + text + "\"")
        yield [TokenType.Tok_input, text]
        continue
      case 223:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 224:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 225:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 226:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 227:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 228:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 229:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 230:
        if (debug) console.log("Lexed token chain_id: \"" + text + "\"")
        yield [TokenType.Tok_chain_id, text]
        continue
      case 231:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 232:
        if (debug) console.log("Lexed token code: \"" + text + "\"")
        yield [TokenType.Tok_code, text]
        continue
    }
    if (inputBuf.empty()) {
      if (debug) console.log(`Got EOF while lexing "${text}"`)
      yield [TokenType.eof, null]
      continue
    }
    throw new Error("Unexpected input: " + buf + tmp)
  }
}