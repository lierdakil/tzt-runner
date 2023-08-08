'use strict'

import {TokenType, tokToStr} from './lexer.js'



function stateToString(state) {
  return [ ".","%eof","E","underscore","%eof","%eof","semi","Elts","StackElt","Block","E_","semi","Elts_","semi","Stack","amount","badType","balance","big_maps","chain_id","code","deadCode","failed","generalOverflow","input","invalidInstr","lp","mutezOverflow","mutezUnderflow","noMatchingOverload","now","other_contracts","output","parameter","rp","self","sender","source","tcError","typeMismatch","underscore","valueError","word","AnyWord","Elt","Type","Value","chain_id","word","word","Seq","Seq","E","lp","rp","TCError","lbr","rbr","Elts_","Elts","PType","PValue","lp","rp","PType","lp","rp","PValue","underscore","tcError","TCError","generalOverflow","mutezOverflow","mutezUnderflow","Value","Value","Value","Value","Value","Value","deadCode","invalidInstr","word","word","lbr","noMatchingOverload","rbr","word","Stack","typeMismatch","Type","Type","badType","Type","valueError","Type","Value","failed","Value","lp","rp","Err","other_contracts","Seq","lbr","rbr","Stack","stack_elt","Type","Value","amount","word","balance","word","big_maps","lbr","rbr","Elts_","chain_id","word","code","Seq","input","lbr","rbr","Stack","now","word","output","StackOrErr","parameter","Type","self","word","sender","word","source","word" ][state]
}

function expectedSym(state) {
  return [ "E","%eof","%eof","lbr/lp/rbr/rp/semi/underscore/word","%eof","%eof","%eof/E","rbr/semi","rbr/semi","E_","%eof","Elts_","rbr","Stack","rbr","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","rbr/semi/Elts","rp/PType","rp/PValue","%eof/chain_id/lbr/lp/rp/semi/underscore/word","%eof/chain_id/lbr/lp/rp/semi/underscore/word","lbr/lp/rbr/rp/semi/underscore/word","amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","lbr/lp/rbr/rp/semi/underscore/word","%eof","TCError","rp","rp","Elts_","%eof/amount/badType/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","rbr","rbr/semi","rp","rp","PType","%eof/chain_id/lbr/lp/rp/semi/underscore/word","rp","PValue","lbr/lp/rbr/rp/semi/underscore/word","rp","rp","TCError","rp","Value","Value","Value","Value","Value","Value","rp","rp","rp","word","word","rp","rp","Stack","word","rp","lbr","rbr","Type","Type","rp","Type","rp","Type","Value","rp","Value","rp","Err","%eof/semi","rp","Seq","%eof/semi","Stack","%eof/semi","rbr","Type","Value","rbr/semi","word","%eof/semi","word","%eof/semi","lbr","Elts_","%eof/semi","rbr","word","%eof/semi","Seq","%eof/semi","lbr","Stack","%eof/semi","rbr","word","%eof/semi","StackOrErr","%eof/semi","Type","%eof/semi","word","%eof/semi","word","%eof/semi","word","%eof/semi" ][state]
}

const Action = [
  [138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,130,136,134,132,126,114,112,110,102,128,122,118,120],
  [139,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [1,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,140,140,140,140,140,140,140,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [141,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [142,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [5,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,130,136,134,132,126,114,112,110,102,128,122,118,120],
  [138,138,138,11,138,143,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,13,138,144,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [4,138,138,6,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [145,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,42,40,138,56,146,26,34,138,25,16,21,41,29,39,38,23,28,27,22,33,37,36,35,30,18,17,15,31,32,24,19,20],
  [138,138,138,138,138,147,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,148,138,138,107,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,149,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,150,150,150,150,150,150,150,138,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150],
  [138,151,151,151,151,151,151,151,138,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151],
  [138,152,152,152,152,152,152,152,138,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152],
  [138,153,153,153,153,153,153,153,138,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153],
  [138,154,154,154,154,154,154,154,138,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154],
  [138,155,155,155,155,155,155,155,138,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155],
  [138,156,156,156,156,156,156,156,138,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156],
  [138,157,157,157,157,157,157,157,138,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157],
  [138,158,158,158,158,158,158,158,138,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158],
  [138,159,159,159,159,159,159,159,138,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159],
  [138,160,160,160,160,160,160,160,138,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160],
  [138,161,161,161,161,161,161,161,138,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161],
  [138,162,162,162,162,162,162,162,138,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162],
  [138,163,163,163,163,163,163,163,138,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163],
  [138,164,164,164,164,164,164,164,138,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164],
  [138,165,165,165,165,165,165,165,138,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165],
  [138,166,166,166,166,166,166,166,138,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166],
  [138,167,167,167,167,167,167,167,138,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167],
  [138,168,168,168,168,168,168,168,138,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168],
  [138,169,169,169,169,169,169,169,138,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169],
  [138,170,170,170,170,170,170,170,138,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170],
  [138,171,171,171,171,171,171,171,138,171,171,171,171,171,171,171,171,171,171,171,171,171,171,171,171,171,171,171,171,171,171,171,171],
  [138,172,172,172,172,172,172,172,138,172,172,172,172,172,172,172,172,172,172,172,172,172,172,172,172,172,172,172,172,172,172,172,172],
  [138,173,173,173,173,173,173,173,138,173,173,173,173,173,173,173,173,173,173,173,173,173,173,173,173,173,173,173,173,173,173,173,173],
  [138,174,174,174,174,174,174,174,138,174,174,174,174,174,174,174,174,174,174,174,174,174,174,174,174,174,174,174,174,174,174,174,174],
  [138,175,175,175,175,175,175,175,138,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175,175],
  [138,176,176,176,176,176,176,176,138,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176,176],
  [138,177,177,177,177,177,177,177,138,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177],
  [138,178,178,178,178,178,178,178,138,178,178,178,178,178,178,178,178,178,178,178,178,178,178,178,178,178,178,178,178,178,178,178,178],
  [138,42,40,179,56,179,26,34,138,25,16,21,41,29,39,38,23,28,27,22,33,37,36,35,30,18,17,15,31,32,24,19,20],
  [138,48,138,138,138,138,62,180,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,47,138],
  [138,49,3,138,56,138,65,181,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [182,182,182,182,182,138,182,182,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,182,138],
  [183,183,183,183,183,138,183,183,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,183,138],
  [138,184,184,184,184,184,184,184,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,185,185,185,185,185,185,185,138,185,185,185,185,185,185,185,185,185,185,185,185,185,185,185,185,185,185,185,185,185,185,185,185],
  [138,186,186,186,186,186,186,186,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [187,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,68,138,138,138,53,138,138,81,92,80,94,85,89,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,138,138,188,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,138,138,54,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,42,40,138,56,146,26,34,138,25,16,21,41,29,39,38,23,28,27,22,33,37,36,35,30,18,17,15,31,32,24,19,20],
  [189,189,189,189,189,189,189,189,138,189,189,189,189,189,189,189,189,189,189,189,189,189,189,189,189,189,189,189,189,189,189,189,189],
  [138,138,138,138,138,57,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,190,138,190,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,138,138,191,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,138,138,192,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,48,138,138,138,138,62,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,47,138],
  [193,193,193,193,193,138,193,193,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,193,138],
  [138,138,138,138,138,138,138,63,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,49,3,138,56,138,65,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,194,194,194,194,194,194,194,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,138,138,66,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,138,138,195,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,68,138,138,138,53,138,138,81,92,80,94,85,89,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,138,138,196,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,49,3,138,56,138,65,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,49,3,138,56,138,65,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,49,3,138,56,138,65,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,49,3,138,56,138,65,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,49,3,138,56,138,65,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,49,3,138,56,138,65,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,138,138,197,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,138,138,198,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,138,138,199,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,82,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,83,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,138,138,200,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,138,138,201,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,148,138,138,107,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,87,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,138,138,202,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,84,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,86,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,48,138,138,138,138,62,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,47,138],
  [138,48,138,138,138,138,62,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,47,138],
  [138,138,138,138,138,138,138,203,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,48,138,138,138,138,62,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,47,138],
  [138,138,138,138,138,138,138,204,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,48,138,138,138,138,62,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,47,138],
  [138,49,3,138,56,138,65,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,138,138,205,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,49,3,138,56,138,65,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,138,138,206,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,69,71,73,72,97,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [207,138,138,207,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,138,138,100,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,56,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [208,138,138,208,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,148,138,138,107,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [209,138,138,209,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,105,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,48,138,138,138,138,62,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,47,138],
  [138,49,3,138,56,138,65,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,210,138,210,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,111,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [211,138,138,211,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,113,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [212,138,138,212,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,115,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,42,40,138,56,146,26,34,138,25,16,21,41,29,39,38,23,28,27,22,33,37,36,35,30,18,17,15,31,32,24,19,20],
  [213,138,138,213,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,116,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,119,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [214,138,138,214,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,56,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [215,138,138,215,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,123,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,148,138,138,107,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [216,138,138,216,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,138,124,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,127,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [217,138,138,217,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,138,138,138,104,138,99,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [218,138,138,218,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,48,138,138,138,138,62,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,47,138],
  [219,138,138,219,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,133,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [220,138,138,220,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,135,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [221,138,138,221,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [138,137,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138],
  [222,138,138,222,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138,138]
  ]
const GOTO = [
  [9,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [9,52,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,43,44,7,12,50,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,14,8,0,0,0,0,0,0,0],
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
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,43,44,59,0,50,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,60,45,0,0,0,0,0],
  [0,0,0,0,0,0,0,51,0,0,0,0,61,46,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,55,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,43,44,7,58,50,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,64,45,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,51,0,0,0,0,67,46,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,70,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,51,0,0,0,0,0,74,0,0,0],
  [0,0,0,0,0,0,0,51,0,0,0,0,0,75,0,0,0],
  [0,0,0,0,0,0,0,51,0,0,0,0,0,76,0,0,0],
  [0,0,0,0,0,0,0,51,0,0,0,0,0,77,0,0,0],
  [0,0,0,0,0,0,0,51,0,0,0,0,0,78,0,0,0],
  [0,0,0,0,0,0,0,51,0,0,0,0,0,79,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,88,8,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,90,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,91,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,93,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,95,0,0,0,0,0],
  [0,0,0,0,0,0,0,51,0,0,0,0,0,96,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,51,0,0,0,0,0,98,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,101,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,103,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,106,8,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,108,0,0,0,0,0],
  [0,0,0,0,0,0,0,51,0,0,0,0,0,109,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,43,44,7,117,50,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,121,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,125,8,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,129],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,131,0,0,0,0,0],
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
      case 139: {
        stack.pop()
        return stack.pop()[1]
        break
      }
      case 150: {
        if (this.debug) console.log("Reduce using AnyWord -> amount")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 151: {
        if (this.debug) console.log("Reduce using AnyWord -> badType")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 152: {
        if (this.debug) console.log("Reduce using AnyWord -> balance")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 153: {
        if (this.debug) console.log("Reduce using AnyWord -> big_maps")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 154: {
        if (this.debug) console.log("Reduce using AnyWord -> chain_id")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 155: {
        if (this.debug) console.log("Reduce using AnyWord -> code")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 156: {
        if (this.debug) console.log("Reduce using AnyWord -> deadCode")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 157: {
        if (this.debug) console.log("Reduce using AnyWord -> failed")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 158: {
        if (this.debug) console.log("Reduce using AnyWord -> generalOverflow")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 159: {
        if (this.debug) console.log("Reduce using AnyWord -> input")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 160: {
        if (this.debug) console.log("Reduce using AnyWord -> invalidInstr")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 161: {
        if (this.debug) console.log("Reduce using AnyWord -> lp")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 162: {
        if (this.debug) console.log("Reduce using AnyWord -> mutezOverflow")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 163: {
        if (this.debug) console.log("Reduce using AnyWord -> mutezUnderflow")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 164: {
        if (this.debug) console.log("Reduce using AnyWord -> noMatchingOverload")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 165: {
        if (this.debug) console.log("Reduce using AnyWord -> now")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 166: {
        if (this.debug) console.log("Reduce using AnyWord -> other_contracts")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 167: {
        if (this.debug) console.log("Reduce using AnyWord -> output")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 168: {
        if (this.debug) console.log("Reduce using AnyWord -> parameter")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 169: {
        if (this.debug) console.log("Reduce using AnyWord -> rp")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 170: {
        if (this.debug) console.log("Reduce using AnyWord -> self")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 171: {
        if (this.debug) console.log("Reduce using AnyWord -> sender")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 172: {
        if (this.debug) console.log("Reduce using AnyWord -> source")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 173: {
        if (this.debug) console.log("Reduce using AnyWord -> tcError")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 174: {
        if (this.debug) console.log("Reduce using AnyWord -> typeMismatch")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 175: {
        if (this.debug) console.log("Reduce using AnyWord -> underscore")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 176: {
        if (this.debug) console.log("Reduce using AnyWord -> valueError")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 177: {
        if (this.debug) console.log("Reduce using AnyWord -> word")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][3] // AnyWord
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 211: {
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
      case 212: {
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
      case 213: {
        if (this.debug) console.log("Reduce using Block -> big_maps lbr Elts_ rbr")
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
        stack.push([gt,({big_maps: _3})])
        break
      }
      case 214: {
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
      case 215: {
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
      case 216: {
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
      case 217: {
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
      case 208: {
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
      case 218: {
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
      case 219: {
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
      case 220: {
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
      case 221: {
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
      case 222: {
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
      case 145: {
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
      case 141: {
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
      case 142: {
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
      case 187: {
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
      case 178: {
        if (this.debug) console.log("Reduce using Elt -> AnyWord")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][4] // Elt
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 185: {
        if (this.debug) console.log("Reduce using Elt -> Seq")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][4] // Elt
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1.length > 0 ? `{ ${_1} }` : "{}")])
        break
      }
      case 179: {
        if (this.debug) console.log("Reduce using Elts -> Elt")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][5] // Elts
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_1)])
        break
      }
      case 190: {
        if (this.debug) console.log("Reduce using Elts -> Elt Elts")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][5] // Elts
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(`${_1} ${_2}`)])
        break
      }
      case 146: {
        if (this.debug) console.log("Reduce using Elts_ -> ")
        
        const gt = GOTO[top()][6] // Elts_
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,([])])
        break
      }
      case 143: {
        if (this.debug) console.log("Reduce using Elts_ -> Elts")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][6] // Elts_
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,([_1])])
        break
      }
      case 147: {
        if (this.debug) console.log("Reduce using Elts_ -> Elts semi Elts_")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][6] // Elts_
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,([_1].concat(_3))])
        break
      }
      case 206: {
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
      case 197: {
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
      case 198: {
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
      case 199: {
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
      case 196: {
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
      case 180: {
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
      case 191: {
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
      case 181: {
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
      case 192: {
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
      case 189: {
        if (this.debug) console.log("Reduce using Seq -> lbr Elts_ rbr")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][7] // Seq
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,(_2.join(" ; "))])
        break
      }
      case 148: {
        if (this.debug) console.log("Reduce using Stack -> ")
        
        const gt = GOTO[top()][8] // Stack
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,([])])
        break
      }
      case 144: {
        if (this.debug) console.log("Reduce using Stack -> StackElt")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][8] // Stack
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,([_1])])
        break
      }
      case 149: {
        if (this.debug) console.log("Reduce using Stack -> StackElt semi Stack")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][8] // Stack
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,([_1].concat(_3))])
        break
      }
      case 210: {
        if (this.debug) console.log("Reduce using StackElt -> stack_elt Type Value")
        const _3 = stack.pop()[1]
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][9] // StackElt
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({ type: _2, val: _3 })])
        break
      }
      case 209: {
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
      case 207: {
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
      case 204: {
        if (this.debug) console.log("Reduce using TCError -> badType Type")
        const _2 = stack.pop()[1]
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][14] // TCError
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,({ class: _1, type: _2 })])
        break
      }
      case 200: {
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
      case 201: {
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
      case 188: {
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
      case 202: {
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
      case 203: {
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
      case 195: {
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
      case 205: {
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
      case 182: {
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
      case 193: {
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
      case 183: {
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
      case 194: {
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
      case 140: {
        if (this.debug) console.log("Reduce using Value -> underscore")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][13] // Value
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,("_")])
        break
      }
      case 184: {
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
      case 186: {
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
      case 138: {
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