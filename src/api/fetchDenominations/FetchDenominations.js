async function fetchDenominations() {
    if (process.env.REACT_APP_BOOKKEEPER_URL == null) {
        console.log("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = process.env.REACT_APP_BOOKKEEPER_URL;
    
    const subDir = "/denomination";
    const apiUrl = API_URL + subDir;

    if (process.env.NODE_ENV === 'development') {
        console.log("Attempting to fetch denominations from: " + apiUrl);
    }

    try {
        let response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: window.localStorage.getItem('password')
            }
        });
        if (response.status !== 200) {
            console.log("Unable to connect to server");
            throw "Could not connect to server."
        }
        console.log("Fetched denominations successfully.");
        let data = await response.json();
        return data;
    }
    catch {
        console.log("Failed to fetch denominations.");
        throw "Could not connect to server."
    }
}

export default fetchDenominations;