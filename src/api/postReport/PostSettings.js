import { Utils } from '../../helpers'
import getApiUrl from '../getApiUrl/GetApiUrl';

async function postSettings(settings) {
    if (getApiUrl() == null) {
        Utils.devlog("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = getApiUrl();

    const subdir = '/setting';
    const apiUrl = API_URL + subdir;

    if (process.env.NODE_ENV === 'development') {
        Utils.devlog("Attempting to post SETTINGS to: " + apiUrl);
        Utils.devlog("Object to post: ");
        Utils.devlog(settings);
    }

    try {
        let response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': window.localStorage.getItem('password'),
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(settings)
        })
    }
    catch {
        Utils.devlog("Failed to update settings");
        throw "Could not connect to server."
    }
}

export default postSettings;