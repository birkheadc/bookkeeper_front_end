import { Utils } from '../../helpers'
import getApiUrl from '../getApiUrl/GetApiUrl';

async function fetchCategories() {
    if (getApiUrl() == null) {
        Utils.devlog("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = getApiUrl();

    const subDir = "/category";
    const apiUrl = API_URL + subDir;

    Utils.devlog("Attempting to fetch CATEGORIES from: " + apiUrl);

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
        Utils.devlog("Fetched transaction types successfully.");
        let data = await response.json();
        return data;
    }
    catch {
        Utils.devlog("Failed to fetch transaction types.");
        throw "Could not connect to server."
    }
}

export default fetchCategories;