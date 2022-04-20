async function postSettings(settings) {
    if (process.env.REACT_APP_BOOKKEEPER_URL == null) {
        console.log("Api url not set, aborting.");
    }
    const API_URL = process.env.REACT_APP_BOOKKEEPER_URL;

    const subdir = '/setting';
    const apiUrl = API_URL + subdir;

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
    }
}

export default postSettings;