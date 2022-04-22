async function postSettings(settings) {
    if (process.env.REACT_APP_BOOKKEEPER_URL == null) {
        console.log("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = process.env.REACT_APP_BOOKKEEPER_URL;

    const subdir = '/setting';
    const apiUrl = API_URL + subdir;

    if (process.env.NODE_ENV === 'development') {
        console.log("Attempting to post SETTINGS to: " + apiUrl);
        console.log("Object to post: ");
        console.log(settings);
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
        console.log("Failed to update settings");
        throw "Could not connect to server."
    }
}

export default postSettings;