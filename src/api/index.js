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
    verifyPassword
}

export { Api };