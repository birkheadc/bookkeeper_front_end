import { Utils } from '../../helpers'


async function fetchLastNDaysSummary(n) {
    if (process.env.REACT_APP_BOOKKEEPER_URL == null) {
        Utils.devlog("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = process.env.REACT_APP_BOOKKEEPER_URL;

    const subDir = "/transaction/past-n-days";
    const apiUrl = API_URL + subDir;

    const queryString = "?n=" + n;
    
    if (process.env.NODE_ENV === 'development') {
        Utils.devlog("Attempting to fetch SUMMARY from " + apiUrl + queryString);
    }

    try {
        let response = await fetch(apiUrl + queryString, {
            method: 'GET',
            headers: {
                Authorization: window.localStorage.getItem('password')
            }
        });
        if (response.status !== 200) {
            Utils.devlog("Failed to fetch summary. Access denied.");
            throw "Could not connect to server."
        }
        let data = await response.json();
        Utils.devlog("Successfully fetched summary.");
        return data;
    }
    catch {
        Utils.devlog("Failed to fetch summary.");
        throw "Could not connect to server."
    }
}

export default fetchLastNDaysSummary;