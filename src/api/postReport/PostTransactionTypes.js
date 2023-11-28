import { Utils } from '../../helpers'
import getApiUrl from '../getApiUrl/GetApiUrl';

async function postTransactionTypes(transactionTypes) {
    if (getApiUrl() == null) {
        Utils.devlog("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = getApiUrl();

    const subdir = '/transactiontype';
    const apiUrl = API_URL + subdir;

    Utils.devlog("Attempting to post TRANSACTION TYPES to " + apiUrl);
    Utils.devlog("Object to post: ");
    Utils.devlog(transactionTypes);

    try {
        let response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': window.localStorage.getItem('password'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionTypes)
        })
        if (response.status === 200) {
            Utils.devlog("Successfully posted transaction types.");
            return;
        }
        Utils.devlog("Failed to post transaction types.");
        throw "Could not connect to server."
        
    }
    catch {
        Utils.devlog("Failed to post transaction types.");
        throw "Could not connect to server."
    }
}

export default postTransactionTypes;