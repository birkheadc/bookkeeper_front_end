import convertTransactionTypeName from "./ConvertTransactionTypeName";
import devlog from "./Devlog";
import getNewUUID from "./GetNewUUID";
import isTransactionNameValid from "./IsTransactionNameValid";

const Utils = {
    devlog,
    getNewUUID
}

const TransactionCategoryHelpers = {
    convertTransactionTypeName,
    isTransactionNameValid
}

export {
    Utils,
    TransactionCategoryHelpers
}