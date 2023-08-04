'use strict'

import {TokenType, tokToStr} from './lexer.js'



function stateToString(state) {
  return [ ".","%eof","E","%eof","%eof","semi","StackElt","Block","E_","semi","Stack","code","lp","parameter","rp","word","AnyWord","Elt","Elts","Type","Value","chain_id","word","word","AnyWord","Seq","Seq","E","lbr","rbr","Elts_","Elts","PType","PValue","Words","semi","Elts_","lp","rp","PType","lp","rp","PValue","lp","rp","Words","other_contracts","Seq","lbr","rbr","Stack","stack_elt","Type","Value","amount","word","balance","word","big_maps","Seq","chain_id","word","code","Seq","input","lbr","rbr","Stack","now","word","output","StackOrErr","parameter","Type","self","word","sender","word","source","word" ][state]
}

function expectedSym(state) {
  return [ "E","%eof","%eof","%eof","%eof","%eof/E","rbr/semi","E_","%eof","Stack","rbr","code/lbr/lp/parameter/rbr/rp/semi/word","code/lbr/lp/parameter/rbr/rp/semi/word","code/lbr/lp/parameter/rbr/rp/semi/word","code/lbr/lp/parameter/rbr/rp/semi/word","code/lbr/lp/parameter/rbr/rp/semi/word","code/lbr/lp/parameter/rbr/rp/semi/word","rbr/semi/Elts","rbr/semi","rp/PType","rp/PValue","%eof/chain_id/lbr/lp/rp/semi/word","%eof/chain_id/lbr/lp/rp/semi/word","lbr/lp/rbr/rp/semi/word","rp/Words","code/lbr/lp/parameter/rbr/rp/semi/word","lbr/lp/rbr/rp/semi/word","%eof","Elts_","%eof/code/lbr/lp/parameter/rbr/rp/semi/word","rbr","rbr/semi","rp","rp","rp","Elts_","rbr","PType","%eof/chain_id/lbr/lp/rp/semi/word","rp","PValue","lbr/lp/rbr/rp/semi/word","rp","Words","%eof/semi","rp","Seq","%eof/semi","Stack","%eof/semi","rbr","Type","Value","rbr/semi","word","%eof/semi","word","%eof/semi","Seq","%eof/semi","word","%eof/semi","Seq","%eof/semi","lbr","Stack","%eof/semi","rbr","word","%eof/semi","StackOrErr","%eof/semi","Type","%eof/semi","word","%eof/semi","word","%eof/semi","word","%eof/semi" ][state]
}

const Action = [
  [80,80,80,80,80,80,80,80,72,78,76,74,68,58,56,54,46,70,64,60,62],
  [81,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [1,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [82,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [83,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [4,80,80,80,80,80,80,80,72,78,76,74,68,58,56,54,46,70,64,60,62],
  [80,80,9,80,84,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [3,80,5,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [85,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,80,80,80,86,80,80,51,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,80,80,80,87,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,88,88,88,88,88,88,80,88,80,80,80,80,80,80,80,80,80,80,80,88],
  [80,89,89,89,89,89,89,80,89,80,80,80,80,80,80,80,80,80,80,80,89],
  [80,90,90,90,90,90,90,80,90,80,80,80,80,80,80,80,80,80,80,80,90],
  [80,91,91,91,91,91,91,80,91,80,80,80,80,80,80,80,80,80,80,80,91],
  [80,92,92,92,92,92,92,80,92,80,80,80,80,80,80,80,80,80,80,80,92],
  [80,93,93,93,93,93,93,80,93,80,80,80,80,80,80,80,80,80,80,80,93],
  [80,15,94,28,94,12,14,80,13,80,80,80,80,80,80,80,80,80,80,80,11],
  [80,80,35,80,95,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,22,80,80,80,37,96,80,80,80,80,80,80,80,80,80,80,80,80,21,80],
  [80,23,80,28,80,40,97,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [98,98,98,98,80,98,98,80,80,80,80,80,80,80,80,80,80,80,80,98,80],
  [99,99,99,99,80,99,99,80,80,80,80,80,80,80,80,80,80,80,80,99,80],
  [80,100,100,100,100,100,100,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,15,80,80,80,12,101,80,13,80,80,80,80,80,80,80,80,80,80,80,11],
  [80,102,102,102,102,102,102,80,102,80,80,80,80,80,80,80,80,80,80,80,102],
  [80,103,103,103,103,103,103,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [104,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,15,80,28,105,12,14,80,13,80,80,80,80,80,80,80,80,80,80,80,11],
  [106,106,106,106,106,106,106,80,106,80,80,80,80,80,80,80,80,80,80,80,106],
  [80,80,80,80,29,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,80,107,80,107,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,80,80,80,80,80,108,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,80,80,80,80,80,109,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,80,80,80,80,80,110,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,15,80,28,105,12,14,80,13,80,80,80,80,80,80,80,80,80,80,80,11],
  [80,80,80,80,111,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,22,80,80,80,37,80,80,80,80,80,80,80,80,80,80,80,80,80,21,80],
  [112,112,112,112,80,112,112,80,80,80,80,80,80,80,80,80,80,80,80,112,80],
  [80,80,80,80,80,80,38,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,23,80,28,80,40,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,113,113,113,113,113,113,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,80,80,80,80,80,41,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,15,80,80,80,12,14,80,13,80,80,80,80,80,80,80,80,80,80,80,11],
  [114,80,114,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,80,80,80,80,80,44,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,80,80,28,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [115,80,115,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,80,80,80,86,80,80,51,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [116,80,116,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,80,80,80,49,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,22,80,80,80,37,80,80,80,80,80,80,80,80,80,80,80,80,80,21,80],
  [80,23,80,28,80,40,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,80,117,80,117,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,55,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [118,80,118,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,57,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [119,80,119,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,80,80,28,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [120,80,120,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,61,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [121,80,121,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,80,80,28,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [122,80,122,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,80,80,65,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,80,80,80,86,80,80,51,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [123,80,123,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,80,80,80,66,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,69,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [124,80,124,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,80,80,48,80,43,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [125,80,125,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,22,80,80,80,37,80,80,80,80,80,80,80,80,80,80,80,80,80,21,80],
  [126,80,126,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,75,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [127,80,127,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,77,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [128,80,128,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [80,79,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80],
  [129,80,129,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80,80]
  ]
const GOTO = [
  [7,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [7,27,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,10,6,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,16,17,31,25,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,32,19,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,26,0,0,33,20,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,24,0,0,0,0,0,0,0,34,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,16,17,18,25,0,0,0,0,0,30,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,16,17,18,25,0,0,0,0,0,36,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,39,19,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,26,0,0,42,20,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,24,0,0,0,0,0,0,0,45,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,47,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,50,6,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,52,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,26,0,0,0,53,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,59,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,63,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,67,6,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,71],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,73,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  ]

export class Parser {
  constructor(debug=false) {
    this.debug = debug
  }

  parse(tokens) {
    const stack = []
    function top() {
      if (stack.length > 0) return stack[stack.length-1][0]
      else return 0
    }
    let a = tokens.next().value
    while(true) {
      const action = Action[top()][a[0]]
      switch(action) {
      case 81: {
        stack.pop()
        return stack.pop()[1]
        break
      }
      case 88: {
        if (this.debug) console.log("Reduce using AnyWord -> code")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][5] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 89: {
        if (this.debug) console.log("Reduce using AnyWord -> lp")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][5] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 90: {
        if (this.debug) console.log("Reduce using AnyWord -> parameter")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][5] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 91: {
        if (this.debug) console.log("Reduce using AnyWord -> rp")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][5] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 92: {
        if (this.debug) console.log("Reduce using AnyWord -> word")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][5] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 118: {
        if (this.debug) console.log("Reduce using Block -> amount word")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][0] // Block
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({amount: _2})])
        break
      }
      case 119: {
        if (this.debug) console.log("Reduce using Block -> balance word")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][0] // Block
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({balance: _2})])
        break
      }
      case 120: {
        if (this.debug) console.log("Reduce using Block -> big_maps Seq")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][0] // Block
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({big_maps: _2})])
        break
      }
      case 121: {
        if (this.debug) console.log("Reduce using Block -> chain_id word")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][0] // Block
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({chain_id: _2})])
        break
      }
      case 122: {
        if (this.debug) console.log("Reduce using Block -> code Seq")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][0] // Block
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({code: _2})])
        break
      }
      case 123: {
        if (this.debug) console.log("Reduce using Block -> input lbr Stack rbr")
        const _4 = stack.pop()[1]
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][0] // Block
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({input: _3})])
        break
      }
      case 124: {
        if (this.debug) console.log("Reduce using Block -> now word")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][0] // Block
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({now: _2})])
        break
      }
      case 115: {
        if (this.debug) console.log("Reduce using Block -> other_contracts Seq")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][0] // Block
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({ other_contracts: _2 })])
        break
      }
      case 125: {
        if (this.debug) console.log("Reduce using Block -> output StackOrErr")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][0] // Block
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({output: _2 })])
        break
      }
      case 126: {
        if (this.debug) console.log("Reduce using Block -> parameter Type")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][0] // Block
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({parameter: _2})])
        break
      }
      case 127: {
        if (this.debug) console.log("Reduce using Block -> self word")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][0] // Block
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({self: _2})])
        break
      }
      case 128: {
        if (this.debug) console.log("Reduce using Block -> sender word")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][0] // Block
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({sender: _2})])
        break
      }
      case 129: {
        if (this.debug) console.log("Reduce using Block -> source word")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][0] // Block
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({source: _2})])
        break
      }
      case 85: {
        if (this.debug) console.log("Reduce using E -> Block E_")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][1] // E
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,([_1].concat(_2))])
        break
      }
      case 82: {
        if (this.debug) console.log("Reduce using E_ -> %eof")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][2] // E_
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,([])])
        break
      }
      case 83: {
        if (this.debug) console.log("Reduce using E_ -> semi %eof")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][2] // E_
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,([])])
        break
      }
      case 104: {
        if (this.debug) console.log("Reduce using E_ -> semi E")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][2] // E_
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_2)])
        break
      }
      case 93: {
        if (this.debug) console.log("Reduce using Elt -> AnyWord")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][6] // Elt
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 102: {
        if (this.debug) console.log("Reduce using Elt -> Seq")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][6] // Elt
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1.length > 0 ? `{ ${_1} }` : "{}")])
        break
      }
      case 94: {
        if (this.debug) console.log("Reduce using Elts -> Elt")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][7] // Elts
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 107: {
        if (this.debug) console.log("Reduce using Elts -> Elt Elts")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][7] // Elts
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(`${_1} ${_2}`)])
        break
      }
      case 105: {
        if (this.debug) console.log("Reduce using Elts_ -> ")
        
        const gt = GOTO[top()][14] // Elts_
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,("")])
        break
      }
      case 95: {
        if (this.debug) console.log("Reduce using Elts_ -> Elts")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][14] // Elts_
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 111: {
        if (this.debug) console.log("Reduce using Elts_ -> Elts semi Elts_")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][14] // Elts_
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(`${_1} ; ${_3}`)])
        break
      }
      case 96: {
        if (this.debug) console.log("Reduce using PType -> Type")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][9] // PType
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 108: {
        if (this.debug) console.log("Reduce using PType -> Type PType")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][9] // PType
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(`${_1} ${_2}`)])
        break
      }
      case 97: {
        if (this.debug) console.log("Reduce using PValue -> Value")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][11] // PValue
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 109: {
        if (this.debug) console.log("Reduce using PValue -> Value PValue")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][11] // PValue
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(`${_1} ${_2}`)])
        break
      }
      case 106: {
        if (this.debug) console.log("Reduce using Seq -> lbr Elts_ rbr")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][8] // Seq
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_2)])
        break
      }
      case 86: {
        if (this.debug) console.log("Reduce using Stack -> ")
        
        const gt = GOTO[top()][3] // Stack
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,([])])
        break
      }
      case 84: {
        if (this.debug) console.log("Reduce using Stack -> StackElt")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // Stack
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,([_1])])
        break
      }
      case 87: {
        if (this.debug) console.log("Reduce using Stack -> StackElt semi Stack")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // Stack
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,([_1].concat(_3))])
        break
      }
      case 117: {
        if (this.debug) console.log("Reduce using StackElt -> stack_elt Type Value")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][4] // StackElt
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({ type: _2, val: _3 })])
        break
      }
      case 116: {
        if (this.debug) console.log("Reduce using StackOrErr -> lbr Stack rbr")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][15] // StackOrErr
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({ stack: _2 })])
        break
      }
      case 114: {
        if (this.debug) console.log("Reduce using StackOrErr -> lp Words rp")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][15] // StackOrErr
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({ err: _2 })])
        break
      }
      case 98: {
        if (this.debug) console.log("Reduce using Type -> chain_id")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][10] // Type
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 112: {
        if (this.debug) console.log("Reduce using Type -> lp PType rp")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][10] // Type
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(`(${_2})`)])
        break
      }
      case 99: {
        if (this.debug) console.log("Reduce using Type -> word")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][10] // Type
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 113: {
        if (this.debug) console.log("Reduce using Value -> lp PValue rp")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][12] // Value
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(`(${_2})`)])
        break
      }
      case 100: {
        if (this.debug) console.log("Reduce using Value -> word")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][12] // Value
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 103: {
        if (this.debug) console.log("Reduce using Value -> Seq")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][12] // Value
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1.length > 0 ? `{ ${_1} }` : "{}")])
        break
      }
      case 101: {
        if (this.debug) console.log("Reduce using Words -> AnyWord")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][13] // Words
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 110: {
        if (this.debug) console.log("Reduce using Words -> AnyWord Words")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][13] // Words
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(`${_1} ${_2}`)])
        break
      }
      case 80: {
        const lastSt = top()
        const parsed = [stateToString(lastSt)]
        while (stack.length > 0) {
          stack.pop()
          parsed.unshift(stateToString(top()))
        }
        throw new Error(
          `Rejection state reached after parsing "${parsed.join(' ')}", when encoutered symbol "${tokToStr(a[0])}" in state ${lastSt}. Expected "${expectedSym(lastSt)}"`)
        break
      }
      default:
        if (this.debug) console.log(`Shift to ${action}`)
        stack.push([action, a[1]])
        a=tokens.next().value
      }
    }
  }
}