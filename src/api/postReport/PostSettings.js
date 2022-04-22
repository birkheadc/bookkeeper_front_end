import { Utils } from '../../helpers'

async function postSettings(settings) {
    if (process.env.REACT_APP_BOOKKEEPER_URL == null) {
        Utils.devlog("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = process.env.REACT_APP_BOOKKEEPER_URL;

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