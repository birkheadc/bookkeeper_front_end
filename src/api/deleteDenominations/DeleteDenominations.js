import { Utils } from '../../helpers'
import getApiUrl from '../getApiUrl/GetApiUrl';

async function deleteDenominations(denominations) {
    if (getApiUrl() == null) {
        Utils.devlog("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = getApiUrl();
    
    const subDir = "/denomination";
    const apiUrl = API_URL + subDir;

    if (process.env.NODE_ENV === 'development') {
        Utils.devlog("Attempt to delete: ");
        Utils.devlog(denominations);
    }

    try {
        let response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': window.localStorage.getItem('password'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(denominations)
        });
        if (response.status !== 200) {
            Utils.devlog("Failed to delete denominations");
            throw "Could not connect to server.";
        }
        Utils.devlog("Successfully deleted denominations");
        return;
    }
    catch {
        Utils.devlog("Failed to delete denominations");
        throw "Could not connect to server.";
    }

    

}

export default deleteDenominations;