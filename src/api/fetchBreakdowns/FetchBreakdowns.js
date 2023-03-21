import { Utils } from '../../helpers'
import getApiUrl from '../getApiUrl/GetApiUrl';

async function fetchBreakdowns(startDate, endDate) {
    if (getApiUrl() == null) {
        Utils.devlog("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = getApiUrl();

    const subDir = "/report/breakdowns";
    const apiUrl = API_URL + subDir;

    const queryString = "?startDate=" + new Date(startDate).toLocaleDateString().replace(/\//g, '-') + "&endDate=" + new Date(endDate).toLocaleDateString().replace(/\//g, '-')
    
    Utils.devlog("Attempting to fetch BREAKDOWNS from " + apiUrl + queryString);

    try {
        let response = await fetch(apiUrl + queryString, {
            method: 'GET',
            headers: {
                Authorization: window.localStorage.getItem('password')
            }
        });
        if (response.status !== 200) {
            Utils.devlog("Failed to fetch breakdowns. Access denied.");
            throw "Could not connect to server."
        }
        let data = await response.json();
        Utils.devlog("Successfully fetched breakdowns.");
        return data;
    }
    catch {
        Utils.devlog("Failed to fetch breakdowns.");
        throw "Could not connect to server."
    }
}

export default fetchBreakdowns;