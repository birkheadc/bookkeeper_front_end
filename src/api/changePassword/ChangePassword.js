import { Utils } from '../../helpers'

async function changePassword(oldPassword, newPassword) {
    if (process.env.REACT_APP_BOOKKEEPER_URL == null) {
        Utils.devlog("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = process.env.REACT_APP_BOOKKEEPER_URL;

    const subdir = '/password';
    const apiUrl = API_URL + subdir;

    if (process.env.NODE_ENV === 'development') {
        Utils.devlog("Attempting to post NEW PASSWORD to: " + apiUrl);
    }

    try {
        let response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': oldPassword,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'old': oldPassword,
                'new': newPassword
            })
        });
        if (response.status !== 200) {
            Utils.devlog("Failed to post new password.");
            throw "Could not connect to server."
        }
        Utils.devlog("Successfully posted new password.");
    }
    catch {
        Utils.devlog("Failed to post new password.");
        throw "Could not connect to server."
    }
}

export default changePassword;