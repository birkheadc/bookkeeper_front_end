import { Utils } from "../../helpers";
import getApiUrl from "../getApiUrl/GetApiUrl";


async function postSettings(settings) {
    const API_URL = getApiUrl();

    if (API_URL == null) {
        Utils.devlog("Api url not set, aborting.");
        throw "Api url not configured.";
    }

    const subdir = '/settings';
    const apiUrl = API_URL + subdir;

    if (process.env.NODE_ENV === 'development') {
        Utils.devlog("Attempting to post SETTINGS to: " + apiUrl);
        Utils.devlog("Object to post: ");
        Utils.devlog(settings);
    }

    try {
        let response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': window.localStorage.getItem('password'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(settings)
        });
        if (response.status !== 200) {
            Utils.devlog("Failed to post settings.");
            throw "Could not connect to server."
        }
        Utils.devlog("Successfully posted.");
        let data = await response.json();
        return data;
    }
    catch {
        Utils.devlog("Failed to post settings.");
        throw "Could not connect to server."
        return null;
    }
}

export default postSettings;