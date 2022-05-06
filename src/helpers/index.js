import convertTransactionTypeName from "./ConvertTransactionTypeName";
import devlog from "./Devlog";
import getNewUUID from "./GetNewUUID";
import isTransactionNameValid from "./IsTransactionNameValid";
import isNoteNameValid from "./isNoteNameValid";
import getDayOfWeekFromDate from "./GetDayOfWeekFromDate";
import getDateStringFromDate from "./GetDateStringFromDate";
import formatNumber from "./FormatNumber";

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

const LocaleConversions = {
    getDayOfWeekFromDate,
    getDateStringFromDate,
    formatNumber
}

export {
    Utils,
    TransactionCategoryHelpers,
    NoteHelpers,
    LocaleConversions
}