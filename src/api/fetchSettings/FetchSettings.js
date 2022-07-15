import { Utils } from '../../helpers'
import getApiUrl from '../getApiUrl/GetApiUrl';

async function fetchSettings() {
    if (getApiUrl() == null) {
        Utils.devlog("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = getApiUrl();
    
    const subDir = "/settings";
    const apiUrl = API_URL + subDir;

    if (process.env.NODE_ENV === 'development') {
        Utils.devlog("Attempting to fetch settings from: " + apiUrl);
    }

    try {
        let response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: window.localStorage.getItem('password')
            }
        });
        if (response.status !== 200) {
            Utils.devlog("Unable to connect to server");
            throw "Could not connect to server."
        }
        Utils.devlog("Fetched settings successfully.");
        let data = await response.json();
        return data;
    }
    catch {
        Utils.devlog("Failed to fetch settings.");
        throw "Could not connect to server."
    }
}

export default fetchSettings;