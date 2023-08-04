'use strict'

export const TokenType = {
  eof: 0,
  Tok_word: 1,
  Tok_semi: 2,
  Tok_lbr: 3,
  Tok_rbr: 4,
  Tok_lp: 5,
  Tok_rp: 6,
  Tok_stack_elt: 7,
  Tok_parameter: 8,
  Tok_source: 9,
  Tok_sender: 10,
  Tok_self: 11,
  Tok_now: 12,
  Tok_big_maps: 13,
  Tok_balance: 14,
  Tok_amount: 15,
  Tok_other_contracts: 16,
  Tok_output: 17,
  Tok_input: 18,
  Tok_chain_id: 19,
  Tok_code: 20
}

export function tokToStr(x) {
  switch(x) {
    case 0: return '%eof'
    case 1: return 'word'
    case 2: return 'semi'
    case 3: return 'lbr'
    case 4: return 'rbr'
    case 5: return 'lp'
    case 6: return 'rp'
    case 7: return 'stack_elt'
    case 8: return 'parameter'
    case 9: return 'source'
    case 10: return 'sender'
    case 11: return 'self'
    case 12: return 'now'
    case 13: return 'big_maps'
    case 14: return 'balance'
    case 15: return 'amount'
    case 16: return 'other_contracts'
    case 17: return 'output'
    case 18: return 'input'
    case 19: return 'chain_id'
    case 20: return 'code'
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
      if ([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17,18,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102].includes(curSt)) {
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
        } else if (curCh === 'c') {
          curSt = 2
          continue
        } else if (curCh === 'i') {
          curSt = 3
          continue
        } else if (curCh === 'o') {
          curSt = 4
          continue
        } else if (curCh === 'a') {
          curSt = 5
          continue
        } else if (curCh === 'b') {
          curSt = 6
          continue
        } else if (curCh === 'n') {
          curSt = 7
          continue
        } else if (curCh === 's') {
          curSt = 8
          continue
        } else if (curCh === 'p') {
          curSt = 9
          continue
        } else if (curCh === 'S') {
          curSt = 10
          continue
        } else if (curCh === ';') {
          curSt = 11
          continue
        } else if (curCh === '{') {
          curSt = 12
          continue
        } else if (curCh === '}') {
          curSt = 13
          continue
        } else if (curCh === '(') {
          curSt = 14
          continue
        } else if (curCh === ')') {
          curSt = 15
          continue
        } else if (curCh === '"') {
          curSt = 16
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 2:
        if (curCh === 'o') {
          curSt = 93
          continue
        } else if (curCh === 'h') {
          curSt = 94
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 3:
        if (curCh === 'n') {
          curSt = 89
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 4:
        if (curCh === 'u') {
          curSt = 70
          continue
        } else if (curCh === 't') {
          curSt = 71
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 5:
        if (curCh === 'm') {
          curSt = 65
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 6:
        if (curCh === 'a') {
          curSt = 52
          continue
        } else if (curCh === 'i') {
          curSt = 53
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 7:
        if (curCh === 'o') {
          curSt = 50
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 8:
        if (curCh === 'e') {
          curSt = 38
          continue
        } else if (curCh === 'o') {
          curSt = 39
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 9:
        if (curCh === 'a') {
          curSt = 30
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 10:
        if (curCh === 't') {
          curSt = 22
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 16:
        if (curCh === '"') {
          curSt = 18
          continue
        } else if (curCh === '\\') {
          curSt = 19
          continue
        } else if (!(curCh === '"')) {
          curSt = 16
          continue
        }
        break
      case 17:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 19:
        if (curCh === '"') {
          curSt = 21
          continue
        } else if (curCh === '\\') {
          curSt = 19
          continue
        } else if (!(curCh === '"')) {
          curSt = 16
          continue
        }
        break
      case 21:
        if (curCh === '"') {
          curSt = 18
          continue
        } else if (curCh === '\\') {
          curSt = 19
          continue
        } else if (!(curCh === '"')) {
          curSt = 16
          continue
        }
        break
      case 22:
        if (curCh === 'a') {
          curSt = 23
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 23:
        if (curCh === 'c') {
          curSt = 24
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 24:
        if (curCh === 'k') {
          curSt = 25
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 25:
        if (curCh === '_') {
          curSt = 26
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 26:
        if (curCh === 'e') {
          curSt = 27
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 27:
        if (curCh === 'l') {
          curSt = 28
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 28:
        if (curCh === 't') {
          curSt = 29
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 29:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 30:
        if (curCh === 'r') {
          curSt = 31
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 31:
        if (curCh === 'a') {
          curSt = 32
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 32:
        if (curCh === 'm') {
          curSt = 33
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 33:
        if (curCh === 'e') {
          curSt = 34
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 34:
        if (curCh === 't') {
          curSt = 35
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 35:
        if (curCh === 'e') {
          curSt = 36
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 36:
        if (curCh === 'r') {
          curSt = 37
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 37:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 38:
        if (curCh === 'l') {
          curSt = 44
          continue
        } else if (curCh === 'n') {
          curSt = 45
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 39:
        if (curCh === 'u') {
          curSt = 40
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 40:
        if (curCh === 'r') {
          curSt = 41
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 41:
        if (curCh === 'c') {
          curSt = 42
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 42:
        if (curCh === 'e') {
          curSt = 43
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 43:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 44:
        if (curCh === 'f') {
          curSt = 49
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 45:
        if (curCh === 'd') {
          curSt = 46
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 46:
        if (curCh === 'e') {
          curSt = 47
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 47:
        if (curCh === 'r') {
          curSt = 48
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 48:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 49:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 50:
        if (curCh === 'w') {
          curSt = 51
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 51:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 52:
        if (curCh === 'l') {
          curSt = 60
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 53:
        if (curCh === 'g') {
          curSt = 54
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 54:
        if (curCh === '_') {
          curSt = 55
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 55:
        if (curCh === 'm') {
          curSt = 56
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 56:
        if (curCh === 'a') {
          curSt = 57
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 57:
        if (curCh === 'p') {
          curSt = 58
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 58:
        if (curCh === 's') {
          curSt = 59
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 59:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 60:
        if (curCh === 'a') {
          curSt = 61
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 61:
        if (curCh === 'n') {
          curSt = 62
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 62:
        if (curCh === 'c') {
          curSt = 63
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 63:
        if (curCh === 'e') {
          curSt = 64
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 64:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 65:
        if (curCh === 'o') {
          curSt = 66
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 66:
        if (curCh === 'u') {
          curSt = 67
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 67:
        if (curCh === 'n') {
          curSt = 68
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 68:
        if (curCh === 't') {
          curSt = 69
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 69:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 70:
        if (curCh === 't') {
          curSt = 85
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 71:
        if (curCh === 'h') {
          curSt = 72
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 72:
        if (curCh === 'e') {
          curSt = 73
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 73:
        if (curCh === 'r') {
          curSt = 74
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 74:
        if (curCh === '_') {
          curSt = 75
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 75:
        if (curCh === 'c') {
          curSt = 76
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 76:
        if (curCh === 'o') {
          curSt = 77
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 77:
        if (curCh === 'n') {
          curSt = 78
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 78:
        if (curCh === 't') {
          curSt = 79
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 79:
        if (curCh === 'r') {
          curSt = 80
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 80:
        if (curCh === 'a') {
          curSt = 81
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 81:
        if (curCh === 'c') {
          curSt = 82
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 82:
        if (curCh === 't') {
          curSt = 83
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 83:
        if (curCh === 's') {
          curSt = 84
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 84:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 85:
        if (curCh === 'p') {
          curSt = 86
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 86:
        if (curCh === 'u') {
          curSt = 87
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 87:
        if (curCh === 't') {
          curSt = 88
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 88:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 89:
        if (curCh === 'p') {
          curSt = 90
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 90:
        if (curCh === 'u') {
          curSt = 91
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 91:
        if (curCh === 't') {
          curSt = 92
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 92:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 93:
        if (curCh === 'd') {
          curSt = 101
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 94:
        if (curCh === 'a') {
          curSt = 95
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 95:
        if (curCh === 'i') {
          curSt = 96
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 96:
        if (curCh === 'n') {
          curSt = 97
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 97:
        if (curCh === '_') {
          curSt = 98
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 98:
        if (curCh === 'i') {
          curSt = 99
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 99:
        if (curCh === 'd') {
          curSt = 100
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 100:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 101:
        if (curCh === 'e') {
          curSt = 102
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
          continue
        }
        break
      case 102:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 17
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
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
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
        if (debug) console.log("Lexed token semi: \"" + text + "\"")
        yield [TokenType.Tok_semi, null]
        continue
      case 12:
        if (debug) console.log("Lexed token lbr: \"" + text + "\"")
        yield [TokenType.Tok_lbr, null]
        continue
      case 13:
        if (debug) console.log("Lexed token rbr: \"" + text + "\"")
        yield [TokenType.Tok_rbr, null]
        continue
      case 14:
        if (debug) console.log("Lexed token lp: \"" + text + "\"")
        yield [TokenType.Tok_lp, text]
        continue
      case 15:
        if (debug) console.log("Lexed token rp: \"" + text + "\"")
        yield [TokenType.Tok_rp, text]
        continue
      case 17:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 18:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 21:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 22:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 23:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 24:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 25:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 26:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 27:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 28:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 29:
        if (debug) console.log("Lexed token stack_elt: \"" + text + "\"")
        yield [TokenType.Tok_stack_elt, null]
        continue
      case 30:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 31:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 32:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 33:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 34:
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
        if (debug) console.log("Lexed token parameter: \"" + text + "\"")
        yield [TokenType.Tok_parameter, text]
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
        if (debug) console.log("Lexed token source: \"" + text + "\"")
        yield [TokenType.Tok_source, text]
        continue
      case 44:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 45:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
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
        if (debug) console.log("Lexed token sender: \"" + text + "\"")
        yield [TokenType.Tok_sender, text]
        continue
      case 49:
        if (debug) console.log("Lexed token self: \"" + text + "\"")
        yield [TokenType.Tok_self, text]
        continue
      case 50:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 51:
        if (debug) console.log("Lexed token now: \"" + text + "\"")
        yield [TokenType.Tok_now, text]
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
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 59:
        if (debug) console.log("Lexed token big_maps: \"" + text + "\"")
        yield [TokenType.Tok_big_maps, text]
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
        if (debug) console.log("Lexed token balance: \"" + text + "\"")
        yield [TokenType.Tok_balance, text]
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
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 68:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 69:
        if (debug) console.log("Lexed token amount: \"" + text + "\"")
        yield [TokenType.Tok_amount, text]
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
        if (debug) console.log("Lexed token other_contracts: \"" + text + "\"")
        yield [TokenType.Tok_other_contracts, text]
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
        if (debug) console.log("Lexed token output: \"" + text + "\"")
        yield [TokenType.Tok_output, text]
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
        if (debug) console.log("Lexed token input: \"" + text + "\"")
        yield [TokenType.Tok_input, text]
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
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
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
        if (debug) console.log("Lexed token chain_id: \"" + text + "\"")
        yield [TokenType.Tok_chain_id, text]
        continue
      case 101:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 102:
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