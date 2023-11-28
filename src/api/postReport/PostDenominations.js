import { Utils } from '../../helpers'
import getApiUrl from '../getApiUrl/GetApiUrl';

async function postDenominations(denominations) {
    if (getApiUrl() == null) {
        Utils.devlog("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = getApiUrl();

    const subDir = '/denomination';
    const apiUrl = API_URL + subDir;

    Utils.devlog("Attempting to post DENOMINATIONS to " + apiUrl);
    Utils.devlog("Object to post: ");
    Utils.devlog(denominations);

    try {
        let response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': window.localStorage.getItem('password'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(denominations)
        })
        if (response.status === 200) {
            Utils.devlog("Successfully posted denominations.");
            return;
        }
        Utils.devlog("Failed to post denominations.");
        throw "Could not connect to server."
        
    }
    catch {
        Utils.devlog("Failed to post denominations.");
        throw "Could not connect to server."
    }
}

export default postDenominations;