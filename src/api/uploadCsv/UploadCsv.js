import { Utils } from '../../helpers'
import getApiUrl from '../getApiUrl/GetApiUrl';

async function uploadCsv(csv) {
    if (getApiUrl() == null) {
        Utils.devlog("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = getApiUrl();

    const subdir = '/transaction/csv';
    const apiUrl = API_URL + subdir;

    const data = new FormData();
    data.append("file", csv);

    if (process.env.NODE_ENV === 'development') {
        Utils.devlog("Attempting to post CSV to: " + apiUrl);
        Utils.devlog("Object to post: ");
        Utils.devlog(csv);
    }

    try {
        let response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': window.localStorage.getItem('password'),
            },
            body: data
        });
        if (response.status !== 200) {
            Utils.devlog("Failed to post csv.");
            throw "Could not connect to server."
        }
        Utils.devlog("Successfully posted csv.");
    }
    catch {
        Utils.devlog("Failed to post csv.");
        throw "Could not connect to server."
    }
}

export default uploadCsv;