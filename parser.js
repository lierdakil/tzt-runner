'use strict'

import {TokenType, tokToStr} from './lexer.js'



function stateToString(state) {
  return [ ".","%eof","E","%eof","%eof","semi","StackElt","Block","E_","semi","Stack","amount","balance","big_maps","chain_id","code","input","lp","now","other_contracts","output","parameter","rp","self","sender","source","word","AnyWord","Elt","Elts","Type","Value","chain_id","word","word","AnyWord","Seq","Seq","E","lbr","rbr","Elts_","Elts","PType","PValue","Words","semi","Elts_","lp","rp","PType","lp","rp","PValue","lp","rp","Words","other_contracts","Seq","lbr","rbr","Stack","stack_elt","Type","Value","amount","word","balance","word","big_maps","Seq","chain_id","word","code","Seq","input","lbr","rbr","Stack","now","word","output","StackOrErr","parameter","Type","self","word","sender","word","source","word" ][state]
}

function expectedSym(state) {
  return [ "E","%eof","%eof","%eof","%eof","%eof/E","rbr/semi","E_","%eof","Stack","rbr","amount/balance/big_maps/chain_id/code/input/lbr/lp/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/word","amount/balance/big_maps/chain_id/code/input/lbr/lp/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/word","amount/balance/big_maps/chain_id/code/input/lbr/lp/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/word","amount/balance/big_maps/chain_id/code/input/lbr/lp/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/word","amount/balance/big_maps/chain_id/code/input/lbr/lp/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/word","amount/balance/big_maps/chain_id/code/input/lbr/lp/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/word","amount/balance/big_maps/chain_id/code/input/lbr/lp/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/word","amount/balance/big_maps/chain_id/code/input/lbr/lp/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/word","amount/balance/big_maps/chain_id/code/input/lbr/lp/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/word","amount/balance/big_maps/chain_id/code/input/lbr/lp/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/word","amount/balance/big_maps/chain_id/code/input/lbr/lp/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/word","amount/balance/big_maps/chain_id/code/input/lbr/lp/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/word","amount/balance/big_maps/chain_id/code/input/lbr/lp/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/word","amount/balance/big_maps/chain_id/code/input/lbr/lp/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/word","amount/balance/big_maps/chain_id/code/input/lbr/lp/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/word","amount/balance/big_maps/chain_id/code/input/lbr/lp/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/word","amount/balance/big_maps/chain_id/code/input/lbr/lp/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/word","rbr/semi/Elts","rbr/semi","rp/PType","rp/PValue","%eof/chain_id/lbr/lp/rp/semi/word","%eof/chain_id/lbr/lp/rp/semi/word","lbr/lp/rbr/rp/semi/word","rp/Words","amount/balance/big_maps/chain_id/code/input/lbr/lp/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/word","lbr/lp/rbr/rp/semi/word","%eof","Elts_","%eof/amount/balance/big_maps/chain_id/code/input/lbr/lp/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/word","rbr","rbr/semi","rp","rp","rp","Elts_","rbr","PType","%eof/chain_id/lbr/lp/rp/semi/word","rp","PValue","lbr/lp/rbr/rp/semi/word","rp","Words","%eof/semi","rp","Seq","%eof/semi","Stack","%eof/semi","rbr","Type","Value","rbr/semi","word","%eof/semi","word","%eof/semi","Seq","%eof/semi","word","%eof/semi","Seq","%eof/semi","lbr","Stack","%eof/semi","rbr","word","%eof/semi","StackOrErr","%eof/semi","Type","%eof/semi","word","%eof/semi","word","%eof/semi","word","%eof/semi" ][state]
}

const Action = [
  [91,91,91,91,91,91,91,91,83,89,87,85,79,69,67,65,57,81,75,71,73],
  [92,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [1,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [93,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [94,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [4,91,91,91,91,91,91,91,83,89,87,85,79,69,67,65,57,81,75,71,73],
  [91,91,9,91,95,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [3,91,5,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [96,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,91,91,91,97,91,91,62,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,91,91,91,98,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,99,99,99,99,99,99,91,99,99,99,99,99,99,99,99,99,99,99,99,99],
  [91,100,100,100,100,100,100,91,100,100,100,100,100,100,100,100,100,100,100,100,100],
  [91,101,101,101,101,101,101,91,101,101,101,101,101,101,101,101,101,101,101,101,101],
  [91,102,102,102,102,102,102,91,102,102,102,102,102,102,102,102,102,102,102,102,102],
  [91,103,103,103,103,103,103,91,103,103,103,103,103,103,103,103,103,103,103,103,103],
  [91,104,104,104,104,104,104,91,104,104,104,104,104,104,104,104,104,104,104,104,104],
  [91,105,105,105,105,105,105,91,105,105,105,105,105,105,105,105,105,105,105,105,105],
  [91,106,106,106,106,106,106,91,106,106,106,106,106,106,106,106,106,106,106,106,106],
  [91,107,107,107,107,107,107,91,107,107,107,107,107,107,107,107,107,107,107,107,107],
  [91,108,108,108,108,108,108,91,108,108,108,108,108,108,108,108,108,108,108,108,108],
  [91,109,109,109,109,109,109,91,109,109,109,109,109,109,109,109,109,109,109,109,109],
  [91,110,110,110,110,110,110,91,110,110,110,110,110,110,110,110,110,110,110,110,110],
  [91,111,111,111,111,111,111,91,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [91,112,112,112,112,112,112,91,112,112,112,112,112,112,112,112,112,112,112,112,112],
  [91,113,113,113,113,113,113,91,113,113,113,113,113,113,113,113,113,113,113,113,113],
  [91,114,114,114,114,114,114,91,114,114,114,114,114,114,114,114,114,114,114,114,114],
  [91,115,115,115,115,115,115,91,115,115,115,115,115,115,115,115,115,115,115,115,115],
  [91,26,116,39,116,17,22,91,21,25,24,23,18,13,12,11,19,20,16,14,15],
  [91,91,46,91,117,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,33,91,91,91,48,118,91,91,91,91,91,91,91,91,91,91,91,91,32,91],
  [91,34,91,39,91,51,119,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [120,120,120,120,91,120,120,91,91,91,91,91,91,91,91,91,91,91,91,120,91],
  [121,121,121,121,91,121,121,91,91,91,91,91,91,91,91,91,91,91,91,121,91],
  [91,122,122,122,122,122,122,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,26,91,91,91,17,123,91,21,25,24,23,18,13,12,11,19,20,16,14,15],
  [91,124,124,124,124,124,124,91,124,124,124,124,124,124,124,124,124,124,124,124,124],
  [91,125,125,125,125,125,125,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [126,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,26,91,39,127,17,22,91,21,25,24,23,18,13,12,11,19,20,16,14,15],
  [128,128,128,128,128,128,128,91,128,128,128,128,128,128,128,128,128,128,128,128,128],
  [91,91,91,91,40,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,91,129,91,129,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,91,91,91,91,91,130,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,91,91,91,91,91,131,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,91,91,91,91,91,132,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,26,91,39,127,17,22,91,21,25,24,23,18,13,12,11,19,20,16,14,15],
  [91,91,91,91,133,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,33,91,91,91,48,91,91,91,91,91,91,91,91,91,91,91,91,91,32,91],
  [134,134,134,134,91,134,134,91,91,91,91,91,91,91,91,91,91,91,91,134,91],
  [91,91,91,91,91,91,49,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,34,91,39,91,51,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,135,135,135,135,135,135,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,91,91,91,91,91,52,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,26,91,91,91,17,22,91,21,25,24,23,18,13,12,11,19,20,16,14,15],
  [136,91,136,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,91,91,91,91,91,55,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,91,91,39,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [137,91,137,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,91,91,91,97,91,91,62,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [138,91,138,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,91,91,91,60,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,33,91,91,91,48,91,91,91,91,91,91,91,91,91,91,91,91,91,32,91],
  [91,34,91,39,91,51,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,91,139,91,139,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,66,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [140,91,140,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,68,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [141,91,141,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,91,91,39,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [142,91,142,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,72,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [143,91,143,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,91,91,39,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [144,91,144,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,91,91,76,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,91,91,91,97,91,91,62,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [145,91,145,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,91,91,91,77,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,80,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [146,91,146,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,91,91,59,91,54,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [147,91,147,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,33,91,91,91,48,91,91,91,91,91,91,91,91,91,91,91,91,91,32,91],
  [148,91,148,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,86,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [149,91,149,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,88,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [150,91,150,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [91,90,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91],
  [151,91,151,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91,91]
  ]
const GOTO = [
  [7,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [7,38,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,27,28,42,36,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,43,30,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,37,0,0,44,31,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,35,0,0,0,0,0,0,0,45,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,27,28,29,36,0,0,0,0,0,41,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,27,28,29,36,0,0,0,0,0,47,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,50,30,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,37,0,0,53,31,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,35,0,0,0,0,0,0,0,56,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,58,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,61,6,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,63,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,37,0,0,0,64,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,70,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,74,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,78,6,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,82],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,84,0,0,0,0,0],
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
      case 92: {
        stack.pop()
        return stack.pop()[1]
        break
      }
      case 99: {
        if (this.debug) console.log("Reduce using AnyWord -> amount")
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
      case 100: {
        if (this.debug) console.log("Reduce using AnyWord -> balance")
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
      case 101: {
        if (this.debug) console.log("Reduce using AnyWord -> big_maps")
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
      case 102: {
        if (this.debug) console.log("Reduce using AnyWord -> chain_id")
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
      case 103: {
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
      case 104: {
        if (this.debug) console.log("Reduce using AnyWord -> input")
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
      case 105: {
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
      case 106: {
        if (this.debug) console.log("Reduce using AnyWord -> now")
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
      case 107: {
        if (this.debug) console.log("Reduce using AnyWord -> other_contracts")
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
      case 108: {
        if (this.debug) console.log("Reduce using AnyWord -> output")
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
      case 109: {
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
      case 110: {
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
      case 111: {
        if (this.debug) console.log("Reduce using AnyWord -> self")
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
      case 112: {
        if (this.debug) console.log("Reduce using AnyWord -> sender")
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
      case 113: {
        if (this.debug) console.log("Reduce using AnyWord -> source")
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
      case 114: {
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
      case 140: {
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
      case 141: {
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
      case 142: {
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
      case 143: {
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
      case 144: {
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
      case 145: {
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
      case 146: {
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
      case 137: {
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
      case 147: {
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
      case 148: {
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
      case 149: {
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
      case 150: {
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
      case 151: {
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
      case 96: {
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
      case 93: {
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
      case 94: {
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
      case 126: {
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
      case 115: {
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
      case 124: {
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
      case 116: {
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
      case 129: {
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
      case 127: {
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
      case 117: {
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
      case 133: {
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
      case 118: {
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
      case 130: {
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
      case 119: {
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
      case 131: {
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
      case 128: {
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
      case 97: {
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
      case 95: {
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
      case 98: {
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
      case 139: {
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
      case 138: {
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
      case 136: {
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
      case 120: {
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
      case 134: {
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
      case 121: {
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
      case 135: {
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
      case 122: {
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
      case 125: {
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
      case 123: {
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
      case 132: {
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
      case 91: {
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