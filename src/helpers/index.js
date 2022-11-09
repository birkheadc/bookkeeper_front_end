import convertTransactionTypeName from "./ConvertTransactionTypeName";
import devlog from "./Devlog";
import getNewUUID from "./GetNewUUID";
import isTransactionNameValid from "./IsTransactionNameValid";
import isNoteNameValid from "./isNoteNameValid";
import getDayOfWeekFromDate from "./GetDayOfWeekFromDate";
import getDateStringFromDate from "./GetDateStringFromDate";
import formatNumber from "./FormatNumber";
import getDatesByDateAndMode from "./GetDatesByDateAndMode";
import camelCaseToTitleCaseSpaces from "./CamelCaseToTitleCaseSpaces";
import toSnakeCase from "./ToSnakeCase";

const Utils = {
    devlog,
    getNewUUID,
    getDatesByDateAndMode,
    camelCaseToTitleCaseSpaces
}

const TransactionCategoryHelpers = {
    convertTransactionTypeName,
    toSnakeCase,
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