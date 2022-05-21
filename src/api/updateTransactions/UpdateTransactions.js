import { Utils } from '../../helpers'
import getApiUrl from '../getApiUrl/GetApiUrl';

async function updateTransactions(transactions) {
    if (getApiUrl() == null) {
        Utils.devlog("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = getApiUrl();

    const subdir = '/transaction/report';
    const apiUrl = API_URL + subdir;

    if (process.env.NODE_ENV === 'development') {
        Utils.devlog("Attempting to update TRANSACTIONS to: " + apiUrl);
        Utils.devlog("Object to post: ");
        Utils.devlog(transactions);
    }

    try {
        let response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': window.localStorage.getItem('password'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                transactions: transactions
            })
        });
        if (response.status !== 200) {
            Utils.devlog("Failed to update transactions.");
            throw "Could not connect to server."
        }
        Utils.devlog("Successfully updated transactions.");
    }
    catch {
        Utils.devlog("Failed to update transactions.");
        throw "Could not connect to server."
    }
    
}

export default updateTransactions;