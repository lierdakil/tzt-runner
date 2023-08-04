'use strict'

import {TokenType, tokToStr} from './lexer.js'



function stateToString(state) {
  return [ ".","%eof","E","%eof","%eof","semi","StackElt","Block","E_","semi","Stack","code","code","lp","lp","parameter","parameter","rp","rp","word","word","Words","Elt","Elts","Type","Value","chain_id","chain_id","chain_id","word","word","word","word","word","AnyWord","AnyWord","Seq","Seq","Seq","E","lbr","lbr","lbr","lbr","rbr","rbr","rbr","rbr","Elts_","Elts_","Elts_","Elts_","Elts","PType","PValue","Words","Words","semi","Elts_","lp","lp","lp","rp","rp","rp","PType","PType","PType","lp","lp","rp","rp","PValue","PValue","lp","rp","Words","other_contracts","Seq","lbr","rbr","Stack","stack_elt","Type","Value","amount","word","balance","word","big_maps","Seq","chain_id","word","code","Seq","input","lbr","rbr","Stack","now","word","output","StackOrErr","parameter","Type","self","word","sender","word","source","word" ][state]
}

function expectedSym(state) {
  return [ "E","%eof","%eof","%eof","%eof","%eof/E","rbr/semi","E_","%eof","Stack","rbr","code/lbr/lp/parameter/rbr/rp/semi/word","code/lp/parameter/rp/word","code/lbr/lp/parameter/rbr/rp/semi/word","code/lp/parameter/rp/word","code/lbr/lp/parameter/rbr/rp/semi/word","code/lp/parameter/rp/word","code/lbr/lp/parameter/rbr/rp/semi/word","code/lp/parameter/rp/word","code/lbr/lp/parameter/rbr/rp/semi/word","code/lp/parameter/rp/word","code/lbr/lp/parameter/rbr/rp/semi/word","rbr/semi/Elts","rbr/semi","rp/PType","rp/PValue","%eof/semi","chain_id/lp/rp/word","lbr/lp/word","%eof/semi","chain_id/lp/rp/word","lbr/lp/word","lbr/lp/rp/word","rbr/semi","code/lbr/lp/parameter/rbr/rp/semi/word/Words","rp/Words","code/lbr/lp/parameter/rbr/rp/semi/word","lbr/lp/rp/word","rbr/semi","%eof","Elts_","Elts_","Elts_","Elts_","%eof/semi","code/lbr/lp/parameter/rbr/rp/semi/word","lbr/lp/rp/word","rbr/semi","rbr","rbr","rbr","rbr","rbr/semi","rp","rp","code/lbr/lp/parameter/rbr/rp/semi/word","rp","Elts_","rbr","PType","PType","PType","%eof/semi","chain_id/lp/rp/word","lbr/lp/word","rp","rp","rp","PValue","PValue","lbr/lp/rp/word","rbr/semi","rp","rp","Words","%eof/semi","rp","Seq","%eof/semi","Stack","%eof/semi","rbr","Type","Value","rbr/semi","word","%eof/semi","word","%eof/semi","Seq","%eof/semi","word","%eof/semi","Seq","%eof/semi","lbr","Stack","%eof/semi","rbr","word","%eof/semi","StackOrErr","%eof/semi","Type","%eof/semi","word","%eof/semi","word","%eof/semi","word","%eof/semi" ][state]
}

const Action = [
  [111,111,111,111,111,111,111,109,107,105,103,101,77,99,95,93,91,89,87,85,111],
  [112,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [1,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [113,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [114,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [4,111,111,111,111,111,111,109,107,105,103,101,77,99,95,93,91,89,87,85,111],
  [111,111,111,111,9,111,115,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [3,111,111,111,5,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [116,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,111,111,111,117,111,111,111,111,111,111,111,111,111,111,111,111,111,82],
  [111,111,111,111,111,111,118,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,119,119,119,119,119,119,111,111,111,119,111,111,111,111,119,111,111,111,111,111],
  [111,119,119,119,111,111,111,111,111,111,119,111,111,111,111,119,111,111,111,111,111],
  [111,120,120,120,120,120,120,111,111,111,120,111,111,111,111,120,111,111,111,111,111],
  [111,120,120,120,111,111,111,111,111,111,120,111,111,111,111,120,111,111,111,111,111],
  [111,121,121,121,121,121,121,111,111,111,121,111,111,111,111,121,111,111,111,111,111],
  [111,121,121,121,111,111,111,111,111,111,121,111,111,111,111,121,111,111,111,111,111],
  [111,122,122,122,122,122,122,111,111,111,122,111,111,111,111,122,111,111,111,111,111],
  [111,122,122,122,111,111,111,111,111,111,122,111,111,111,111,122,111,111,111,111,111],
  [111,123,123,123,123,123,123,111,111,111,123,111,111,111,111,123,111,111,111,111,111],
  [111,123,123,123,111,111,111,111,111,111,123,111,111,111,111,123,111,111,111,111,111],
  [111,124,124,124,124,124,124,111,111,111,124,111,111,111,111,124,111,111,111,111,111],
  [111,13,17,19,125,41,125,111,111,111,15,111,111,111,111,11,111,111,111,111,111],
  [111,111,111,111,57,111,126,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,60,127,30,111,111,111,111,111,111,111,111,111,111,111,111,27,111,111,111,111],
  [111,68,128,32,111,42,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [129,111,111,111,129,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,129,129,129,111,111,111,111,111,111,111,111,111,111,111,111,129,111,111,111,111],
  [111,129,111,129,111,129,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [130,111,111,111,130,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,130,130,130,111,111,111,111,111,111,111,111,111,111,111,111,130,111,111,111,111],
  [111,130,111,130,111,130,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,131,131,131,111,131,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,111,131,111,131,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,132,132,132,132,132,132,111,111,111,132,111,111,111,111,132,111,111,111,111,111],
  [111,14,132,20,111,111,111,111,111,111,16,111,111,111,111,12,111,111,111,111,111],
  [111,133,133,133,133,133,133,111,111,111,133,111,111,111,111,133,111,111,111,111,111],
  [111,134,134,134,111,134,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,111,134,111,134,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [135,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,13,17,19,111,41,136,111,111,111,15,111,111,111,111,11,111,111,111,111,111],
  [111,13,17,19,111,41,136,111,111,111,15,111,111,111,111,11,111,111,111,111,111],
  [111,13,17,19,111,41,136,111,111,111,15,111,111,111,111,11,111,111,111,111,111],
  [111,13,17,19,111,41,136,111,111,111,15,111,111,111,111,11,111,111,111,111,111],
  [137,111,111,111,137,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,137,137,137,137,137,137,111,111,111,137,111,111,111,111,137,111,111,111,111,111],
  [111,137,137,137,111,137,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,111,137,111,137,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,111,111,111,44,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,111,111,111,45,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,111,111,111,46,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,111,111,111,47,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,111,138,111,138,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,139,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,140,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,141,141,141,141,141,141,111,111,111,141,111,111,111,111,141,111,111,111,111,111],
  [111,111,141,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,13,17,19,111,41,136,111,111,111,15,111,111,111,111,11,111,111,111,111,111],
  [111,111,111,111,111,111,142,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,60,111,30,111,111,111,111,111,111,111,111,111,111,111,111,27,111,111,111,111],
  [111,60,111,30,111,111,111,111,111,111,111,111,111,111,111,111,27,111,111,111,111],
  [111,60,111,30,111,111,111,111,111,111,111,111,111,111,111,111,27,111,111,111,111],
  [143,111,111,111,143,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,143,143,143,111,111,111,111,111,111,111,111,111,111,111,111,143,111,111,111,111],
  [111,143,111,143,111,143,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,62,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,63,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,64,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,68,111,32,111,42,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,68,111,32,111,42,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,144,144,144,111,144,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,111,144,111,144,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,70,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,71,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,14,18,20,111,111,111,111,111,111,16,111,111,111,111,12,111,111,111,111,111],
  [145,111,111,111,145,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,75,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,111,111,40,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [146,111,111,111,146,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,111,111,111,117,111,111,111,111,111,111,111,111,111,111,111,111,111,82],
  [147,111,111,111,147,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,111,111,111,80,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,61,111,31,111,111,111,111,111,111,111,111,111,111,111,111,28,111,111,111,111],
  [111,69,111,33,111,43,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,111,148,111,148,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,86,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [149,111,111,111,149,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,88,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [150,111,111,111,150,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,111,111,40,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [151,111,111,111,151,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,92,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [152,111,111,111,152,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,111,111,40,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [153,111,111,111,153,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,111,111,96,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,111,111,111,117,111,111,111,111,111,111,111,111,111,111,111,111,111,82],
  [154,111,111,111,154,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,111,111,111,97,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,100,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [155,111,111,111,155,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,74,111,111,111,79,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [156,111,111,111,156,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,59,111,29,111,111,111,111,111,111,111,111,111,111,111,111,26,111,111,111,111],
  [157,111,111,111,157,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,106,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [158,111,111,111,158,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,108,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [159,111,111,111,159,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [111,111,111,110,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111],
  [160,111,111,111,160,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111,111]
  ]
const GOTO = [
  [7,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [7,39,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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
  [0,0,0,0,0,34,22,52,36,21,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,53,24,0,0,0,0],
  [0,0,0,0,0,0,0,0,37,0,0,0,54,25,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,34,0,0,0,55,0,0,0,0,0,0],
  [0,0,0,0,0,35,0,0,0,56,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,34,22,23,36,21,0,0,0,0,48,0],
  [0,0,0,0,0,34,22,23,36,21,0,0,0,0,49,0],
  [0,0,0,0,0,34,22,23,36,21,0,0,0,0,50,0],
  [0,0,0,0,0,34,22,23,36,21,0,0,0,0,51,0],
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
  [0,0,0,0,0,34,22,23,36,21,0,0,0,0,58,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,65,24,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,66,24,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,67,24,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,37,0,0,0,72,25,0,0],
  [0,0,0,0,0,0,0,0,37,0,0,0,73,25,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,35,0,0,0,76,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,78,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,81,6,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,83,0,0,0,0],
  [0,0,0,0,0,0,0,0,38,0,0,0,0,84,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,90,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,94,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,98,6,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,102],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,104,0,0,0,0],
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
      case 112: {
        stack.pop()
        return stack.pop()[1]
        break
      }
      case 119: {
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
      case 120: {
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
      case 121: {
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
      case 122: {
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
      case 123: {
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
      case 149: {
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
      case 150: {
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
      case 151: {
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
      case 152: {
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
      case 153: {
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
      case 154: {
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
      case 155: {
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
      case 146: {
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
      case 156: {
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
      case 157: {
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
      case 158: {
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
      case 159: {
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
      case 160: {
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
      case 116: {
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
      case 113: {
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
      case 114: {
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
      case 135: {
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
      case 133: {
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
      case 124: {
        if (this.debug) console.log("Reduce using Elt -> Words")
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
      case 125: {
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
      case 138: {
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
      case 136: {
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
      case 126: {
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
      case 142: {
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
      case 127: {
        if (this.debug) console.log("Reduce using PType -> Type")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][10] // PType
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 139: {
        if (this.debug) console.log("Reduce using PType -> Type PType")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][10] // PType
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(`${_1} ${_2}`)])
        break
      }
      case 128: {
        if (this.debug) console.log("Reduce using PValue -> Value")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][12] // PValue
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 140: {
        if (this.debug) console.log("Reduce using PValue -> Value PValue")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][12] // PValue
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(`${_1} ${_2}`)])
        break
      }
      case 137: {
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
      case 117: {
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
      case 115: {
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
      case 118: {
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
      case 148: {
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
      case 147: {
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
      case 145: {
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
      case 129: {
        if (this.debug) console.log("Reduce using Type -> chain_id")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][11] // Type
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 143: {
        if (this.debug) console.log("Reduce using Type -> lp PType rp")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][11] // Type
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(`(${_2})`)])
        break
      }
      case 130: {
        if (this.debug) console.log("Reduce using Type -> word")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][11] // Type
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 144: {
        if (this.debug) console.log("Reduce using Value -> lp PValue rp")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][13] // Value
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(`(${_2})`)])
        break
      }
      case 131: {
        if (this.debug) console.log("Reduce using Value -> word")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][13] // Value
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 134: {
        if (this.debug) console.log("Reduce using Value -> Seq")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][13] // Value
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1.length > 0 ? `{ ${_1} }` : "{}")])
        break
      }
      case 132: {
        if (this.debug) console.log("Reduce using Words -> AnyWord")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][9] // Words
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 141: {
        if (this.debug) console.log("Reduce using Words -> AnyWord Words")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][9] // Words
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(`${_1} ${_2}`)])
        break
      }
      case 111: {
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