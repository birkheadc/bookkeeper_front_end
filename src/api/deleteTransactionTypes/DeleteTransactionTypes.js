import { Utils } from '../../helpers'
import getApiUrl from '../getApiUrl/GetApiUrl';

async function deleteTransactionTypes(transactonTypes) {
    if (getApiUrl() == null) {
        Utils.devlog("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = getApiUrl();
    
    const subDir = "/transactiontype";
    const apiUrl = API_URL + subDir;

    if (process.env.NODE_ENV === 'development') {
            Utils.devlog("Attempt to delete: ");
            Utils.devlog(transactonTypes);
    }

    try {
        let response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': window.localStorage.getItem('password'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactonTypes)
        });
        if (response.status === 200) {
            Utils.devlog("Successfully delete transaction types");
            return;
        }
        Utils.devlog("Failed to delete transaction types");
        throw "Failed to delete transaction types."
    }
    catch {
        Utils.devlog("Failed to delete transaction types");
        throw "Failed to delete transaction types."
    }

    

}

export default deleteTransactionTypes;