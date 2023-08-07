'use strict'

import {TokenType, tokToStr} from './lexer.js'



function stateToString(state) {
  return [ ".","%eof","E","underscore","%eof","%eof","semi","StackElt","Block","E_","semi","Stack","amount","balance","big_maps","chain_id","code","deadCode","failed","generalOverflow","input","invalidInstr","lp","mutezOverflow","mutezUnderflow","noMatchingOverload","now","other_contracts","output","parameter","rp","self","sender","source","tcError","typeMismatch","underscore","valueError","word","AnyWord","Elt","Elts","Type","Value","chain_id","word","word","Seq","Seq","E","lbr","rbr","Elts_","lp","rp","TCError","Elts","PType","PValue","semi","Elts_","lp","rp","PType","lp","rp","PValue","underscore","tcError","TCError","generalOverflow","mutezOverflow","mutezUnderflow","Value","Value","Value","Value","Value","Value","deadCode","invalidInstr","word","word","lbr","noMatchingOverload","rbr","word","Stack","typeMismatch","Type","Type","valueError","Type","Value","failed","Value","lp","rp","Err","other_contracts","Seq","lbr","rbr","Stack","stack_elt","Type","Value","amount","word","balance","word","big_maps","Seq","chain_id","word","code","Seq","input","lbr","rbr","Stack","now","word","output","StackOrErr","parameter","Type","self","word","sender","word","source","word" ][state]
}

function expectedSym(state) {
  return [ "E","%eof","%eof","lbr/lp/rbr/rp/semi/underscore/word","%eof","%eof","%eof/E","rbr/semi","E_","%eof","Stack","rbr","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","rbr/semi/Elts","rbr/semi","rp/PType","rp/PValue","%eof/chain_id/lbr/lp/rp/semi/underscore/word","%eof/chain_id/lbr/lp/rp/semi/underscore/word","lbr/lp/rbr/rp/semi/underscore/word","amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","lbr/lp/rbr/rp/semi/underscore/word","%eof","Elts_","%eof/amount/balance/big_maps/chain_id/code/deadCode/failed/generalOverflow/input/invalidInstr/lbr/lp/mutezOverflow/mutezUnderflow/noMatchingOverload/now/other_contracts/output/parameter/rbr/rp/self/semi/sender/source/tcError/typeMismatch/underscore/valueError/word","rbr","TCError","rp","rp","rbr/semi","rp","rp","Elts_","rbr","PType","%eof/chain_id/lbr/lp/rp/semi/underscore/word","rp","PValue","lbr/lp/rbr/rp/semi/underscore/word","rp","rp","TCError","rp","Value","Value","Value","Value","Value","Value","rp","rp","rp","word","word","rp","rp","Stack","word","rp","lbr","rbr","Type","Type","rp","Type","Value","rp","Value","rp","Err","%eof/semi","rp","Seq","%eof/semi","Stack","%eof/semi","rbr","Type","Value","rbr/semi","word","%eof/semi","word","%eof/semi","Seq","%eof/semi","word","%eof/semi","Seq","%eof/semi","lbr","Stack","%eof/semi","rbr","word","%eof/semi","StackOrErr","%eof/semi","Type","%eof/semi","word","%eof/semi","word","%eof/semi","word","%eof/semi" ][state]
}

const Action = [
  [133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,125,131,129,127,121,111,109,107,99,123,117,113,115],
  [134,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [1,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,135,135,135,135,135,135,135,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [136,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [137,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [5,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,125,131,129,127,121,111,109,107,99,123,117,113,115],
  [133,133,133,10,133,138,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [4,133,133,6,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [139,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,140,133,133,104,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,141,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,142,142,142,142,142,142,142,133,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142,142],
  [133,143,143,143,143,143,143,143,133,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143,143],
  [133,144,144,144,144,144,144,144,133,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144,144],
  [133,145,145,145,145,145,145,145,133,145,145,145,145,145,145,145,145,145,145,145,145,145,145,145,145,145,145,145,145,145,145,145],
  [133,146,146,146,146,146,146,146,133,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146,146],
  [133,147,147,147,147,147,147,147,133,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147,147],
  [133,148,148,148,148,148,148,148,133,148,148,148,148,148,148,148,148,148,148,148,148,148,148,148,148,148,148,148,148,148,148,148],
  [133,149,149,149,149,149,149,149,133,149,149,149,149,149,149,149,149,149,149,149,149,149,149,149,149,149,149,149,149,149,149,149],
  [133,150,150,150,150,150,150,150,133,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150,150],
  [133,151,151,151,151,151,151,151,133,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151,151],
  [133,152,152,152,152,152,152,152,133,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152,152],
  [133,153,153,153,153,153,153,153,133,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153,153],
  [133,154,154,154,154,154,154,154,133,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154,154],
  [133,155,155,155,155,155,155,155,133,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155,155],
  [133,156,156,156,156,156,156,156,133,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156,156],
  [133,157,157,157,157,157,157,157,133,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157,157],
  [133,158,158,158,158,158,158,158,133,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158,158],
  [133,159,159,159,159,159,159,159,133,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159,159],
  [133,160,160,160,160,160,160,160,133,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160,160],
  [133,161,161,161,161,161,161,161,133,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161,161],
  [133,162,162,162,162,162,162,162,133,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162,162],
  [133,163,163,163,163,163,163,163,133,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163,163],
  [133,164,164,164,164,164,164,164,133,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164,164],
  [133,165,165,165,165,165,165,165,133,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165,165],
  [133,166,166,166,166,166,166,166,133,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166,166],
  [133,167,167,167,167,167,167,167,133,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167,167],
  [133,168,168,168,168,168,168,168,133,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168,168],
  [133,169,169,169,169,169,169,169,133,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169,169],
  [133,38,36,170,50,170,22,30,133,21,17,37,25,35,34,19,24,23,18,29,33,32,31,26,14,13,12,27,28,20,15,16],
  [133,133,133,59,133,171,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,45,133,133,133,133,61,172,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,44,133],
  [133,46,3,133,50,133,64,173,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [174,174,174,174,174,133,174,174,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,174,133],
  [175,175,175,175,175,133,175,175,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,175,133],
  [133,176,176,176,176,176,176,176,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,177,177,177,177,177,177,177,133,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177,177],
  [133,178,178,178,178,178,178,178,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [179,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,38,36,133,50,180,22,30,133,21,17,37,25,35,34,19,24,23,18,29,33,32,31,26,14,13,12,27,28,20,15,16],
  [181,181,181,181,181,181,181,181,133,181,181,181,181,181,181,181,181,181,181,181,181,181,181,181,181,181,181,181,181,181,181,181],
  [133,133,133,133,133,51,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,67,133,133,133,53,133,133,80,79,91,84,88,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,133,133,182,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,133,133,54,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,183,133,183,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,133,133,184,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,133,133,185,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,38,36,133,50,180,22,30,133,21,17,37,25,35,34,19,24,23,18,29,33,32,31,26,14,13,12,27,28,20,15,16],
  [133,133,133,133,133,186,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,45,133,133,133,133,61,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,44,133],
  [187,187,187,187,187,133,187,187,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,187,133],
  [133,133,133,133,133,133,133,62,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,46,3,133,50,133,64,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,188,188,188,188,188,188,188,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,133,133,65,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,133,133,189,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,67,133,133,133,53,133,133,80,79,91,84,88,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,133,133,190,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,46,3,133,50,133,64,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,46,3,133,50,133,64,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,46,3,133,50,133,64,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,46,3,133,50,133,64,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,46,3,133,50,133,64,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,46,3,133,50,133,64,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,133,133,191,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,133,133,192,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,133,133,193,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,81,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,82,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,133,133,194,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,133,133,195,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,140,133,133,104,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,86,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,133,133,196,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,83,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,85,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,45,133,133,133,133,61,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,44,133],
  [133,45,133,133,133,133,61,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,44,133],
  [133,133,133,133,133,133,133,197,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,45,133,133,133,133,61,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,44,133],
  [133,46,3,133,50,133,64,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,133,133,198,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,46,3,133,50,133,64,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,133,133,199,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,133,133,133,133,133,133,133,133,133,68,70,72,71,94,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [200,133,133,200,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,133,133,97,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,50,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [201,133,133,201,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,140,133,133,104,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [202,133,133,202,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,102,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,45,133,133,133,133,61,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,44,133],
  [133,46,3,133,50,133,64,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,203,133,203,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,108,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [204,133,133,204,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,110,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [205,133,133,205,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,50,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [206,133,133,206,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,114,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [207,133,133,207,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,50,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [208,133,133,208,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,118,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,140,133,133,104,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [209,133,133,209,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,133,119,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,122,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [210,133,133,210,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,133,133,133,101,133,96,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [211,133,133,211,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,45,133,133,133,133,61,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,44,133],
  [212,133,133,212,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,128,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [213,133,133,213,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,130,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [214,133,133,214,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [133,132,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133],
  [215,133,133,215,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133,133]
  ]
const GOTO = [
  [8,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [8,49,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,11,7,0,0,0,0,0,0,0,0,0,0,0,0],
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
  [0,0,0,0,0,39,40,56,47,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,57,42,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,48,0,0,58,43,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,39,40,41,47,0,0,0,0,52,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,55,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,39,40,41,47,0,0,0,0,60,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,63,42,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,48,0,0,66,43,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,69,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,48,0,0,0,73,0,0,0,0],
  [0,0,0,0,0,0,0,0,48,0,0,0,74,0,0,0,0],
  [0,0,0,0,0,0,0,0,48,0,0,0,75,0,0,0,0],
  [0,0,0,0,0,0,0,0,48,0,0,0,76,0,0,0,0],
  [0,0,0,0,0,0,0,0,48,0,0,0,77,0,0,0,0],
  [0,0,0,0,0,0,0,0,48,0,0,0,78,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,87,7,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,89,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,90,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,92,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,48,0,0,0,93,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,48,0,0,0,95,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,98,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,100,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,103,7,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,105,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,48,0,0,0,106,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,112,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,116,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,120,7,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,124],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,126,0,0,0,0,0,0],
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
      case 134: {
        stack.pop()
        return stack.pop()[1]
        break
      }
      case 142: {
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
      case 143: {
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
      case 144: {
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
      case 145: {
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
      case 146: {
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
      case 147: {
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
      case 148: {
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
      case 149: {
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
      case 150: {
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
      case 151: {
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
      case 152: {
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
      case 153: {
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
      case 154: {
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
      case 155: {
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
      case 156: {
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
      case 157: {
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
      case 158: {
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
      case 159: {
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
      case 160: {
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
      case 161: {
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
      case 162: {
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
      case 163: {
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
      case 164: {
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
      case 165: {
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
      case 166: {
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
      case 167: {
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
      case 168: {
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
      case 204: {
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
      case 205: {
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
      case 206: {
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
      case 207: {
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
      case 208: {
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
      case 209: {
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
      case 210: {
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
      case 201: {
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
      case 211: {
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
      case 212: {
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
      case 213: {
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
      case 214: {
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
      case 215: {
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
      case 139: {
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
      case 136: {
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
      case 137: {
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
      case 179: {
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
      case 169: {
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
      case 177: {
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
      case 170: {
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
      case 183: {
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
      case 180: {
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
      case 171: {
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
      case 186: {
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
      case 199: {
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
      case 191: {
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
      case 192: {
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
      case 193: {
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
      case 190: {
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
      case 172: {
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
      case 184: {
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
      case 173: {
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
      case 185: {
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
      case 181: {
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
      case 140: {
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
      case 138: {
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
      case 141: {
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
      case 203: {
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
      case 202: {
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
      case 200: {
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
      case 194: {
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
      case 195: {
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
      case 182: {
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
      case 196: {
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
      case 197: {
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
      case 189: {
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
      case 198: {
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
      case 174: {
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
      case 187: {
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
      case 175: {
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
      case 188: {
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
      case 135: {
        if (this.debug) console.log("Reduce using Value -> underscore")
        const _1 = stack.pop()[1]
        const gt = GOTO[top()][12] // Value
        if (gt===0) throw new Exception("No goto")
        if (this.debug) {
          console.log(`${top()} is now on top of the stack`)
          console.log(`${gt} will be placed on the stack`)
        }
        stack.push([gt,("_")])
        break
      }
      case 176: {
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
      case 178: {
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
      case 133: {
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