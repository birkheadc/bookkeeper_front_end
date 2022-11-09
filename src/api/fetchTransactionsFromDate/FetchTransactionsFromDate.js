import fetchSummary from "../fetchSummary/FetchSummary";

async function fetchTransactionsFromDate(date) {
    // Janky hack using old code and then post-processing it, rather than writing another fetch.
    const summary = await fetchSummary(date, date);
    if (summary == null) {
        return {
            earnings: [],
            expenses: []
        };
    }
    const t = {
        earnings: summary.positiveTransactions,
        expenses: summary.negativeTransactions
    };
    
    return t;
}

export default fetchTransactionsFromDate;