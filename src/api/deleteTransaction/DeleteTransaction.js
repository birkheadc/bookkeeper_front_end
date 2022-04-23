import { Utils } from '../../helpers'

async function deleteTransaction(id) {
    if (process.env.REACT_APP_BOOKKEEPER_URL == null) {
        Utils.devlog("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = process.env.REACT_APP_BOOKKEEPER_URL;

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