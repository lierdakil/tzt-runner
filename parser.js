'use strict'

import {TokenType, tokToStr} from './lexer.js'



function stateToString(state) {
  return [ ".","%eof","E","%eof","%eof","semi","StackElt","Block","E_","semi","Stack","amount","balance","big_maps","chain_id","code","deadCode","failed","generalOverflow","input","invalidInstr","lp","mutezOverflow","mutezUnderflow","noMatchingOverload","now","other_contracts","output","parameter","rp","self","sender","source","tcError","typeMismatch","underscore","valueError","word","AnyWord","Elt","Elts","Type","Value","chain_id","word","word","Seq","Seq","E","lbr","rbr","Elts_","lp","rp","TCError","Elts","PType","PValue","semi","Elts_","lp","rp","PType","lp","rp","PValue","underscore","tcError","TCError","generalOverflow","mutezOverflow","mutezUnderflow","Value","Value","Value","Value","Value","Value","deadCode","invalidInstr","word","word","lbr","noMatchingOverload","rbr","word","Stack","typeMismatch","Type","Type","valueError","Type","Value","failed","Value","lp","rp","Err","other_contracts","Seq","lbr","rbr","Stack","stack_elt","Type","Value","amount","word","balance","word","big_maps","Seq","chain_id","word","code","Seq","input","lbr","rbr","Stack","now","word","output","StackOrErr","parameter","Type","self","word","sender","word","source","word" ][state]
}

function expectedSym(state) {
  return [ "E","%eof","%eof","%eof","%eof","%eof/E","rbr/semi","E_","%eof","Stack","rbr","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","rbr/semi/Elts","rbr/semi","rp/PType","rp/PValue","%eof/chain_id/lbr/lp/rp/semi/word","%eof/chain_id/lbr/lp/rp/semi/word","lbr/lp/rbr/rp/semi/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","lbr/lp/rbr/rp/semi/word","%eof","Elts_","%eof/amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","rbr","TCError","rp","rp","rbr/semi","rp","rp","Elts_","rbr","PType","%eof/chain_id/lbr/lp/rp/semi/word","rp","PValue","lbr/lp/rbr/rp/semi/word","rp","rp","TCError","rp","Value","Value","Value","Value","Value","Value","rp","rp","rp","word","word","rp","rp","Stack","word","rp","lbr","rbr","Type","Type","rp","Type","Value","rp","Value","rp","Err","%eof/semi","rp","Seq","%eof/semi","Stack","%eof/semi","rbr","Type","Value","rbr/semi","word","%eof/semi","word","%eof/semi","Seq","%eof/semi","word","%eof/semi","Seq","%eof/semi","lbr","Stack","%eof/semi","rbr","word","%eof/semi","StackOrErr","%eof/semi","Type","%eof/semi","word","%eof/semi","word","%eof/semi","word","%eof/semi" ][state]
}

const Action = [
  [132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,124,130,128,126,120,110,108,106,98,122,116,112,114],
  [133,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [1,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [134,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [135,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [4,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,124,130,128,126,120,110,108,106,98,122,116,112,114],
  [132,132,132,9,132,136,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [3,132,132,5,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [137,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,138,132,132,103,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,139,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,140,140,140,140,140,140,140,132,140,140,140,140,140,140,140,140,140,140,140,140,140,140,140,140,140,140,140,140,140,140,140],
  [132,141,141,141,141,141,141,141,132,141,141,141,141,141,141,141,141,141,141,141,141,141,141,141,141,141,141,141,141,141,141,141],
  [132,142,142,142,142,142,142,142,132,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142],
  [132,143,143,143,143,143,143,143,132,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143],
  [132,144,144,144,144,144,144,144,132,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144],
  [132,145,145,145,145,145,145,145,132,145,145,145,145,145,145,145,145,145,145,145,145,145,145,145,145,145,145,145,145,145,145,145],
  [132,146,146,146,146,146,146,146,132,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146],
  [132,147,147,147,147,147,147,147,132,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147],
  [132,148,148,148,148,148,148,148,132,148,148,148,148,148,148,148,148,148,148,148,148,148,148,148,148,148,148,148,148,148,148,148],
  [132,149,149,149,149,149,149,149,132,149,149,149,149,149,149,149,149,149,149,149,149,149,149,149,149,149,149,149,149,149,149,149],
  [132,150,150,150,150,150,150,150,132,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150],
  [132,151,151,151,151,151,151,151,132,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151],
  [132,152,152,152,152,152,152,152,132,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152],
  [132,153,153,153,153,153,153,153,132,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153],
  [132,154,154,154,154,154,154,154,132,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154],
  [132,155,155,155,155,155,155,155,132,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155],
  [132,156,156,156,156,156,156,156,132,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156],
  [132,157,157,157,157,157,157,157,132,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157],
  [132,158,158,158,158,158,158,158,132,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158],
  [132,159,159,159,159,159,159,159,132,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159],
  [132,160,160,160,160,160,160,160,132,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160],
  [132,161,161,161,161,161,161,161,132,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161],
  [132,162,162,162,162,162,162,162,132,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162],
  [132,163,163,163,163,163,163,163,132,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163],
  [132,164,164,164,164,164,164,164,132,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164],
  [132,165,165,165,165,165,165,165,132,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165],
  [132,166,166,166,166,166,166,166,132,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166],
  [132,167,167,167,167,167,167,167,132,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167],
  [132,37,35,168,49,168,21,29,132,20,16,36,24,34,33,18,23,22,17,28,32,31,30,25,13,12,11,26,27,19,14,15],
  [132,132,132,58,132,169,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,44,132,132,132,132,60,170,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,43,132],
  [132,45,132,132,49,132,63,171,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [172,172,132,172,172,132,172,172,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,172,132],
  [173,173,132,173,173,132,173,173,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,173,132],
  [132,174,132,174,174,174,174,174,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,175,175,175,175,175,175,175,132,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175],
  [132,176,132,176,176,176,176,176,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [177,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,37,35,132,49,178,21,29,132,20,16,36,24,34,33,18,23,22,17,28,32,31,30,25,13,12,11,26,27,19,14,15],
  [179,179,179,179,179,179,179,179,132,179,179,179,179,179,179,179,179,179,179,179,179,179,179,179,179,179,179,179,179,179,179,179],
  [132,132,132,132,132,50,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,66,132,132,132,52,132,132,79,78,90,83,87,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,132,132,180,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,132,132,53,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,181,132,181,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,132,132,182,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,132,132,183,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,37,35,132,49,178,21,29,132,20,16,36,24,34,33,18,23,22,17,28,32,31,30,25,13,12,11,26,27,19,14,15],
  [132,132,132,132,132,184,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,44,132,132,132,132,60,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,43,132],
  [185,185,132,185,185,132,185,185,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,185,132],
  [132,132,132,132,132,132,132,61,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,45,132,132,49,132,63,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,186,132,186,186,186,186,186,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,132,132,64,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,132,132,187,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,66,132,132,132,52,132,132,79,78,90,83,87,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,132,132,188,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,45,132,132,49,132,63,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,45,132,132,49,132,63,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,45,132,132,49,132,63,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,45,132,132,49,132,63,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,45,132,132,49,132,63,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,45,132,132,49,132,63,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,132,132,189,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,132,132,190,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,132,132,191,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,80,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,81,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,132,132,192,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,132,132,193,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,138,132,132,103,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,85,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,132,132,194,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,82,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,84,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,44,132,132,132,132,60,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,43,132],
  [132,44,132,132,132,132,60,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,43,132],
  [132,132,132,132,132,132,132,195,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,44,132,132,132,132,60,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,43,132],
  [132,45,132,132,49,132,63,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,132,132,196,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,45,132,132,49,132,63,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,132,132,197,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,132,132,132,132,132,132,132,132,132,67,69,71,70,93,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [198,132,132,198,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,132,132,96,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,49,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [199,132,132,199,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,138,132,132,103,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [200,132,132,200,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,101,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,44,132,132,132,132,60,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,43,132],
  [132,45,132,132,49,132,63,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,201,132,201,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,107,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [202,132,132,202,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,109,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [203,132,132,203,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,49,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [204,132,132,204,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,113,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [205,132,132,205,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,49,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [206,132,132,206,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,117,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,138,132,132,103,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [207,132,132,207,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,132,118,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,121,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [208,132,132,208,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,132,132,132,100,132,95,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [209,132,132,209,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,44,132,132,132,132,60,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,43,132],
  [210,132,132,210,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,127,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [211,132,132,211,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,129,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [212,132,132,212,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [132,131,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132],
  [213,132,132,213,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132,132]
  ]
const GOTO = [
  [7,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [7,48,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,8,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,10,6,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,38,39,55,46,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,56,41,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,47,0,0,57,42,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,38,39,40,46,0,0,0,0,51,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,54,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,38,39,40,46,0,0,0,0,59,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,62,41,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,47,0,0,65,42,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,68,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,47,0,0,0,72,0,0,0,0],
  [0,0,0,0,0,0,0,0,47,0,0,0,73,0,0,0,0],
  [0,0,0,0,0,0,0,0,47,0,0,0,74,0,0,0,0],
  [0,0,0,0,0,0,0,0,47,0,0,0,75,0,0,0,0],
  [0,0,0,0,0,0,0,0,47,0,0,0,76,0,0,0,0],
  [0,0,0,0,0,0,0,0,47,0,0,0,77,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,86,6,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,88,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,89,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,91,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,47,0,0,0,92,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,47,0,0,0,94,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,97,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,99,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,102,6,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,104,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,47,0,0,0,105,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,111,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,115,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,119,6,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,123],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,125,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
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
      case 133: {
        stack.pop()
        return stack.pop()[1]
        break
      }
      case 140: {
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
      case 141: {
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
      case 142: {
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
      case 143: {
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
      case 144: {
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
      case 145: {
        if (this.debug) console.log("Reduce using AnyWord -> deadCode")
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
      case 146: {
        if (this.debug) console.log("Reduce using AnyWord -> failed")
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
      case 147: {
        if (this.debug) console.log("Reduce using AnyWord -> generalOverflow")
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
      case 148: {
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
      case 149: {
        if (this.debug) console.log("Reduce using AnyWord -> invalidInstr")
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
      case 150: {
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
      case 151: {
        if (this.debug) console.log("Reduce using AnyWord -> mutezOverflow")
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
      case 152: {
        if (this.debug) console.log("Reduce using AnyWord -> mutezUnderflow")
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
      case 153: {
        if (this.debug) console.log("Reduce using AnyWord -> noMatchingOverload")
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
      case 154: {
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
      case 155: {
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
      case 156: {
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
      case 157: {
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
      case 158: {
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
      case 159: {
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
      case 160: {
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
      case 161: {
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
      case 162: {
        if (this.debug) console.log("Reduce using AnyWord -> tcError")
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
      case 163: {
        if (this.debug) console.log("Reduce using AnyWord -> typeMismatch")
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
      case 164: {
        if (this.debug) console.log("Reduce using AnyWord -> underscore")
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
      case 165: {
        if (this.debug) console.log("Reduce using AnyWord -> valueError")
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
      case 166: {
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
      case 202: {
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
      case 203: {
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
      case 204: {
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
      case 205: {
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
      case 206: {
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
      case 207: {
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
      case 208: {
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
      case 199: {
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
      case 209: {
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
      case 210: {
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
      case 211: {
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
      case 212: {
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
      case 213: {
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
      case 137: {
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
      case 134: {
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
      case 135: {
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
      case 177: {
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
      case 167: {
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
      case 175: {
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
      case 168: {
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
      case 181: {
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
      case 178: {
        if (this.debug) console.log("Reduce using Elts_ -> ")
        
        const gt = GOTO[top()][13] // Elts_
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,("")])
        break
      }
      case 169: {
        if (this.debug) console.log("Reduce using Elts_ -> Elts")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][13] // Elts_
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 184: {
        if (this.debug) console.log("Reduce using Elts_ -> Elts semi Elts_")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][13] // Elts_
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(`${_1} ; ${_3}`)])
        break
      }
      case 197: {
        if (this.debug) console.log("Reduce using Err -> failed Value")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][15] // Err
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({ class: _1, val: _2 })])
        break
      }
      case 189: {
        if (this.debug) console.log("Reduce using Err -> generalOverflow Value Value")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][15] // Err
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({ class: _1, i: _2, j: _3 })])
        break
      }
      case 190: {
        if (this.debug) console.log("Reduce using Err -> mutezOverflow Value Value")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][15] // Err
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({ class: _1, i: _2, j: _3 })])
        break
      }
      case 191: {
        if (this.debug) console.log("Reduce using Err -> mutezUnderflow Value Value")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][15] // Err
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({ class: _1, i: _2, j: _3 })])
        break
      }
      case 188: {
        if (this.debug) console.log("Reduce using Err -> tcError TCError")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][15] // Err
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({ class: _1, detail: _2 })])
        break
      }
      case 170: {
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
      case 182: {
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
      case 171: {
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
      case 183: {
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
      case 179: {
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
      case 138: {
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
      case 136: {
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
      case 139: {
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
      case 201: {
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
      case 200: {
        if (this.debug) console.log("Reduce using StackOrErr -> lbr Stack rbr")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][16] // StackOrErr
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({ stack: _2 })])
        break
      }
      case 198: {
        if (this.debug) console.log("Reduce using StackOrErr -> lp Err rp")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][16] // StackOrErr
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({ err: _2 })])
        break
      }
      case 192: {
        if (this.debug) console.log("Reduce using TCError -> deadCode word")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][14] // TCError
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({ class: _1, instr: _2 })])
        break
      }
      case 193: {
        if (this.debug) console.log("Reduce using TCError -> invalidInstr word")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][14] // TCError
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({ class: _1, instr: _2 })])
        break
      }
      case 180: {
        if (this.debug) console.log("Reduce using TCError -> lp TCError rp")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][14] // TCError
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_2)])
        break
      }
      case 194: {
        if (this.debug) console.log("Reduce using TCError -> noMatchingOverload word lbr Stack rbr")
        const _5 = stack.pop()[1]
        const _4 = stack.pop()[1]
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][14] // TCError
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({ class: _1, instr: _2, stack: _4 })])
        break
      }
      case 195: {
        if (this.debug) console.log("Reduce using TCError -> typeMismatch Type Type")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][14] // TCError
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({ class: _1, l: _2, r: _3 })])
        break
      }
      case 187: {
        if (this.debug) console.log("Reduce using TCError -> underscore")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][14] // TCError
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(null)])
        break
      }
      case 196: {
        if (this.debug) console.log("Reduce using TCError -> valueError Type Value")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][14] // TCError
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({ class: _1, type: _2, value: _3 })])
        break
      }
      case 172: {
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
      case 185: {
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
      case 173: {
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
      case 186: {
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
      case 174: {
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
      case 176: {
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
      case 132: {
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