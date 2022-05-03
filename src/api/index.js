import deleteDenominations from "./deleteDenominations/DeleteDenominations";
import deleteTransactionTypes from "./deleteTransactionTypes/DeleteTransactionTypes";
import fetchDenominations from "./fetchDenominations/FetchDenominations";
import fetchSettings from "./fetchSettings/FetchSettings";
import fetchSummary from "./fetchSummary/FetchSummary";
import fetchTransactionTypes from "./fetchTransactionTypes/FetchTransactionTypes";
import postDenominations from "./postReport/PostDenominations";
import postReport from "./postReport/PostReport";
import postSettings from "./postReport/PostSettings";
import postTransactionTypes from "./postReport/PostTransactionTypes";
import verifyPassword from "./verifyPassword/VerifyPassword";
import deleteTransaction from "./deleteTransaction/DeleteTransaction";
import updateTransactions from "./updateTransactions/UpdateTransactions";
import fetchLastNDaysSummary from "./fetchLastNDaysSummary/FetchLastNDaysSummary";
import uploadCsv from "./uploadCsv/UploadCsv";

const Api = {
    deleteDenominations,
    deleteTransactionTypes,
    fetchDenominations,
    fetchSettings,
    fetchSummary,
    fetchTransactionTypes,
    postDenominations,
    postReport,
    postSettings,
    postTransactionTypes,
    verifyPassword,
    deleteTransaction,
    updateTransactions,
    fetchLastNDaysSummary,
    uploadCsv
}

export { Api };