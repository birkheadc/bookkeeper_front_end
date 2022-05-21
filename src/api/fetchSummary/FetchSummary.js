import { Utils } from '../../helpers'
import getApiUrl from '../getApiUrl/GetApiUrl';

async function fetchSummary(startDate, endDate) {
    if (getApiUrl() == null) {
        Utils.devlog("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = getApiUrl();

    const subDir = "/transaction/summary";
    const apiUrl = API_URL + subDir;

    const queryString = "?startDate=" + new Date(startDate).toLocaleDateString().replace(/\//g, '-') + "&endDate=" + new Date(endDate).toLocaleDateString().replace(/\//g, '-')
    
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

export default fetchSummary;