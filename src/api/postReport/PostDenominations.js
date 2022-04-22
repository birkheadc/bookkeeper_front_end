import { Utils } from '../../helpers'

async function postDenominations(denominations) {
    if (process.env.REACT_APP_BOOKKEEPER_URL == null) {
        Utils.devlog("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = process.env.REACT_APP_BOOKKEEPER_URL;

    const subDir = '/denomination';
    const apiUrl = API_URL + subDir;

    if (process.env.NODE_ENV === 'development') {
        Utils.devlog("Attempting to post DENOMINATIONS to " + apiUrl);
        Utils.devlog("Object to post: ");
        Utils.devlog(denominations);
    }

    try {
        let response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': window.localStorage.getItem('password'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(denominations)
        })
        if (response.status === 200) {
            Utils.devlog("Successfully posted denominations.");
            return;
        }
        Utils.devlog("Failed to post denominations.");
        throw "Could not connect to server."
        
    }
    catch {
        Utils.devlog("Failed to post denominations.");
        throw "Could not connect to server."
    }
}

export default postDenominations;