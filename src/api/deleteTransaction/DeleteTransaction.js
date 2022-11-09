import { Utils } from '../../helpers'
import getApiUrl from '../getApiUrl/GetApiUrl';

async function deleteTransaction(id) {
    if (getApiUrl() == null) {
        Utils.devlog("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = getApiUrl();

    const subDir = '/transaction/' + id;
    const apiUrl = API_URL + subDir;

    try {
        let response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': window.localStorage.getItem('password'),
            }
        });
        if (response.status !== 200) {
            Utils.devlog("Failed to delete transaction");
            throw "Failed to delete transaction."
        }
    }
    catch {
        Utils.devlog("Failed to delete transaction");
        throw "Failed to delete transaction."
    }
}

export default deleteTransaction;