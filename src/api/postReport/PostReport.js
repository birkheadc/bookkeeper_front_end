import { Utils } from '../../helpers'
import getApiUrl from '../getApiUrl/GetApiUrl';

async function postReport(report) {
    const API_URL = getApiUrl();

    if (API_URL == null) {
        Utils.devlog("Api url not set, aborting.");
        throw "Api url not configured.";
    }

    const subdir = '/report';
    const apiUrl = API_URL + subdir;

    const reportDto = {
        date : report.reports[0].date,
        earnings : report.reports[0].earnings,
        expenses : report.reports[0].expenses,
        denominations : report.denominations
    }

    if (process.env.NODE_ENV === 'development') {
        Utils.devlog("Attempting to post REPORT to: " + apiUrl);
        Utils.devlog("Object to post: ");
        Utils.devlog(reportDto);
    }

    try {
        let response = await fetch(apiUrl, {
            method: 'PUT',
            headers: {
                'Authorization': window.localStorage.getItem('password'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reportDto)
        });
        if (response.status !== 200) {
            Utils.devlog("Failed to post transactions.");
            throw "Could not connect to server."
        }
        Utils.devlog("Successfully posted.");
    }
    catch {
        Utils.devlog("Failed to post transactions.");
        throw "Could not connect to server."
    }
    
}

export default postReport;