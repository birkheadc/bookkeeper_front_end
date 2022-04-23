import convertTransactionTypeName from "./ConvertTransactionTypeName";
import devlog from "./Devlog";
import getNewUUID from "./GetNewUUID";
import isTransactionNameValid from "./IsTransactionNameValid";
import isNoteNameValid from "./isNoteNameValid";

const Utils = {
    devlog,
    getNewUUID
}

const TransactionCategoryHelpers = {
    convertTransactionTypeName,
    isTransactionNameValid
}

const NoteHelpers = {
    isNoteNameValid
}

export {
    Utils,
    TransactionCategoryHelpers,
    NoteHelpers
}