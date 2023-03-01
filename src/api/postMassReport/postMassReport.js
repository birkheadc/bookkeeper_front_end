import { Utils } from "../../helpers";
import getApiUrl from "../getApiUrl/GetApiUrl";

export default async function postMassReport(expenses = [], earnings = []) {
  const API_URL = getApiUrl();

    if (API_URL == null) {
        Utils.devlog("Api url not set, aborting.");
        throw "Api url not configured.";
    }

    const subdir = '/report/mass-report';
    const apiUrl = API_URL + subdir;

    const massReport = {
      expenses: expenses,
      earnings: earnings
    };

    Utils.devlog("Attempting to post MASS REPORT to: " + apiUrl);
    Utils.devlog("Object to post: ");
    Utils.devlog(massReport);

    try {
        let response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': window.localStorage.getItem('password'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(massReport)
        });
        if (response.status !== 200) {
            Utils.devlog("Failed to post mass report.");
            return false;
        }
        Utils.devlog("Successfully posted.");
        return true;
    }
    catch {
        Utils.devlog("Failed to post mass report.");
        return false;
    }
}