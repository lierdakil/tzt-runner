'use strict'

export const TokenType = {
  eof: 0,
  Tok_lp: 1,
  Tok_rp: 2,
  Tok_word: 3,
  Tok_semi: 4,
  Tok_lbr: 5,
  Tok_rbr: 6,
  Tok_source: 7,
  Tok_sender: 8,
  Tok_self: 9,
  Tok_parameter: 10,
  Tok_output: 11,
  Tok_other_contracts: 12,
  Tok_now: 13,
  Tok_input: 14,
  Tok_code: 15,
  Tok_chain_id: 16,
  Tok_big_maps: 17,
  Tok_balance: 18,
  Tok_amount: 19,
  Tok_stack_elt: 20
}

export function tokToStr(x) {
  switch(x) {
    case 0: return '%eof'
    case 1: return 'lp'
    case 2: return 'rp'
    case 3: return 'word'
    case 4: return 'semi'
    case 5: return 'lbr'
    case 6: return 'rbr'
    case 7: return 'source'
    case 8: return 'sender'
    case 9: return 'self'
    case 10: return 'parameter'
    case 11: return 'output'
    case 12: return 'other_contracts'
    case 13: return 'now'
    case 14: return 'input'
    case 15: return 'code'
    case 16: return 'chain_id'
    case 17: return 'big_maps'
    case 18: return 'balance'
    case 19: return 'amount'
    case 20: return 'stack_elt'
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
      if ([1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99].includes(curSt)) {
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
        if (curCh === '"') {
          curSt = 2
          continue
        } else if (curCh === '(') {
          curSt = 3
          continue
        } else if (curCh === ')') {
          curSt = 4
          continue
        } else if (curCh === ';') {
          curSt = 6
          continue
        } else if (curCh === 'S') {
          curSt = 7
          continue
        } else if (curCh === 'a') {
          curSt = 8
          continue
        } else if (curCh === 'b') {
          curSt = 9
          continue
        } else if (curCh === 'c') {
          curSt = 10
          continue
        } else if (curCh === 'i') {
          curSt = 11
          continue
        } else if (curCh === 'n') {
          curSt = 12
          continue
        } else if (curCh === 'o') {
          curSt = 13
          continue
        } else if (curCh === 'p') {
          curSt = 14
          continue
        } else if (curCh === 's') {
          curSt = 15
          continue
        } else if (curCh === '{') {
          curSt = 16
          continue
        } else if (curCh === '}') {
          curSt = 17
          continue
        } else if (curCh === '\u{00000009}' || curCh === '\u{0000000a}' || curCh === '\u{0000000d}' || curCh === ' ') {
          curSt = 1
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 2:
        if (curCh === '"') {
          curSt = 99
          continue
        } else if (!(curCh === '"')) {
          curSt = 2
          continue
        }
        break
      case 5:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 7:
        if (curCh === 't') {
          curSt = 91
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 8:
        if (curCh === 'm') {
          curSt = 86
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 9:
        if (curCh === 'a') {
          curSt = 73
          continue
        } else if (curCh === 'i') {
          curSt = 74
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 10:
        if (curCh === 'h') {
          curSt = 63
          continue
        } else if (curCh === 'o') {
          curSt = 64
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 11:
        if (curCh === 'n') {
          curSt = 59
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 12:
        if (curCh === 'o') {
          curSt = 57
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 13:
        if (curCh === 't') {
          curSt = 38
          continue
        } else if (curCh === 'u') {
          curSt = 39
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 14:
        if (curCh === 'a') {
          curSt = 30
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 15:
        if (curCh === 'e') {
          curSt = 18
          continue
        } else if (curCh === 'o') {
          curSt = 19
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 18:
        if (curCh === 'l') {
          curSt = 24
          continue
        } else if (curCh === 'n') {
          curSt = 25
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 19:
        if (curCh === 'u') {
          curSt = 20
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 20:
        if (curCh === 'r') {
          curSt = 21
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 21:
        if (curCh === 'c') {
          curSt = 22
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 22:
        if (curCh === 'e') {
          curSt = 23
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 23:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 24:
        if (curCh === 'f') {
          curSt = 29
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 25:
        if (curCh === 'd') {
          curSt = 26
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 26:
        if (curCh === 'e') {
          curSt = 27
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 27:
        if (curCh === 'r') {
          curSt = 28
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 28:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 29:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 30:
        if (curCh === 'r') {
          curSt = 31
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 31:
        if (curCh === 'a') {
          curSt = 32
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 32:
        if (curCh === 'm') {
          curSt = 33
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 33:
        if (curCh === 'e') {
          curSt = 34
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 34:
        if (curCh === 't') {
          curSt = 35
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 35:
        if (curCh === 'e') {
          curSt = 36
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 36:
        if (curCh === 'r') {
          curSt = 37
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 37:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 38:
        if (curCh === 'h') {
          curSt = 44
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 39:
        if (curCh === 't') {
          curSt = 40
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 40:
        if (curCh === 'p') {
          curSt = 41
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 41:
        if (curCh === 'u') {
          curSt = 42
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 42:
        if (curCh === 't') {
          curSt = 43
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 43:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 44:
        if (curCh === 'e') {
          curSt = 45
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 45:
        if (curCh === 'r') {
          curSt = 46
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 46:
        if (curCh === '_') {
          curSt = 47
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 47:
        if (curCh === 'c') {
          curSt = 48
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 48:
        if (curCh === 'o') {
          curSt = 49
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 49:
        if (curCh === 'n') {
          curSt = 50
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 50:
        if (curCh === 't') {
          curSt = 51
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 51:
        if (curCh === 'r') {
          curSt = 52
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 52:
        if (curCh === 'a') {
          curSt = 53
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 53:
        if (curCh === 'c') {
          curSt = 54
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 54:
        if (curCh === 't') {
          curSt = 55
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 55:
        if (curCh === 's') {
          curSt = 56
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 56:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 57:
        if (curCh === 'w') {
          curSt = 58
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 58:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 59:
        if (curCh === 'p') {
          curSt = 60
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 60:
        if (curCh === 'u') {
          curSt = 61
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 61:
        if (curCh === 't') {
          curSt = 62
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 62:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 63:
        if (curCh === 'a') {
          curSt = 67
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 64:
        if (curCh === 'd') {
          curSt = 65
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 65:
        if (curCh === 'e') {
          curSt = 66
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 66:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 67:
        if (curCh === 'i') {
          curSt = 68
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 68:
        if (curCh === 'n') {
          curSt = 69
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 69:
        if (curCh === '_') {
          curSt = 70
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 70:
        if (curCh === 'i') {
          curSt = 71
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 71:
        if (curCh === 'd') {
          curSt = 72
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 72:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 73:
        if (curCh === 'l') {
          curSt = 81
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 74:
        if (curCh === 'g') {
          curSt = 75
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 75:
        if (curCh === '_') {
          curSt = 76
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 76:
        if (curCh === 'm') {
          curSt = 77
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 77:
        if (curCh === 'a') {
          curSt = 78
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 78:
        if (curCh === 'p') {
          curSt = 79
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 79:
        if (curCh === 's') {
          curSt = 80
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 80:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 81:
        if (curCh === 'a') {
          curSt = 82
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 82:
        if (curCh === 'n') {
          curSt = 83
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 83:
        if (curCh === 'c') {
          curSt = 84
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 84:
        if (curCh === 'e') {
          curSt = 85
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 85:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 86:
        if (curCh === 'o') {
          curSt = 87
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 87:
        if (curCh === 'u') {
          curSt = 88
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 88:
        if (curCh === 'n') {
          curSt = 89
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 89:
        if (curCh === 't') {
          curSt = 90
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 90:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 91:
        if (curCh === 'a') {
          curSt = 92
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 92:
        if (curCh === 'c') {
          curSt = 93
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 93:
        if (curCh === 'k') {
          curSt = 94
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 94:
        if (curCh === '_') {
          curSt = 95
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 95:
        if (curCh === 'e') {
          curSt = 96
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 96:
        if (curCh === 'l') {
          curSt = 97
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 97:
        if (curCh === 't') {
          curSt = 98
          continue
        } else if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
          continue
        }
        break
      case 98:
        if (curCh === '-' || curCh === '[' || curCh === ']' || curCh === '_' || (curCh >= '0' && curCh <= '9') || (curCh >= 'A' && curCh <= 'Z') || (curCh >= 'a' && curCh <= 'z')) {
          curSt = 5
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
      case 3:
        if (debug) console.log("Lexed token lp: \"" + text + "\"")
        yield [TokenType.Tok_lp, text]
        continue
      case 4:
        if (debug) console.log("Lexed token rp: \"" + text + "\"")
        yield [TokenType.Tok_rp, text]
        continue
      case 5:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 6:
        if (debug) console.log("Lexed token semi: \"" + text + "\"")
        yield [TokenType.Tok_semi, null]
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
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 16:
        if (debug) console.log("Lexed token lbr: \"" + text + "\"")
        yield [TokenType.Tok_lbr, null]
        continue
      case 17:
        if (debug) console.log("Lexed token rbr: \"" + text + "\"")
        yield [TokenType.Tok_rbr, null]
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
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 23:
        if (debug) console.log("Lexed token source: \"" + text + "\"")
        yield [TokenType.Tok_source, text]
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
        if (debug) console.log("Lexed token sender: \"" + text + "\"")
        yield [TokenType.Tok_sender, text]
        continue
      case 29:
        if (debug) console.log("Lexed token self: \"" + text + "\"")
        yield [TokenType.Tok_self, text]
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
        if (debug) console.log("Lexed token output: \"" + text + "\"")
        yield [TokenType.Tok_output, text]
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
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
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
        if (debug) console.log("Lexed token other_contracts: \"" + text + "\"")
        yield [TokenType.Tok_other_contracts, text]
        continue
      case 57:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 58:
        if (debug) console.log("Lexed token now: \"" + text + "\"")
        yield [TokenType.Tok_now, text]
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
        if (debug) console.log("Lexed token input: \"" + text + "\"")
        yield [TokenType.Tok_input, text]
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
        if (debug) console.log("Lexed token code: \"" + text + "\"")
        yield [TokenType.Tok_code, text]
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
        if (debug) console.log("Lexed token chain_id: \"" + text + "\"")
        yield [TokenType.Tok_chain_id, text]
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
        if (debug) console.log("Lexed token big_maps: \"" + text + "\"")
        yield [TokenType.Tok_big_maps, text]
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
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
        continue
      case 85:
        if (debug) console.log("Lexed token balance: \"" + text + "\"")
        yield [TokenType.Tok_balance, text]
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
        if (debug) console.log("Lexed token amount: \"" + text + "\"")
        yield [TokenType.Tok_amount, text]
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
        if (debug) console.log("Lexed token stack_elt: \"" + text + "\"")
        yield [TokenType.Tok_stack_elt, null]
        continue
      case 99:
        if (debug) console.log("Lexed token word: \"" + text + "\"")
        yield [TokenType.Tok_word,  text ]
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