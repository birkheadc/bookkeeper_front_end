async function postDenominations(denominations) {
    if (process.env.REACT_APP_BOOKKEEPER_URL == null) {
        console.log("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = process.env.REACT_APP_BOOKKEEPER_URL;

    const subDir = '/denomination';
    const apiUrl = API_URL + subDir;

    if (process.env.NODE_ENV === 'development') {
        console.log("Attempting to post DENOMINATIONS to " + apiUrl);
        console.log("Object to post: ");
        console.log(denominations);
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
            console.log("Successfully posted denominations.");
            return;
        }
        console.log("Failed to post denominations.");
        throw "Could not connect to server."
        
    }
    catch {
        console.log("Failed to post denominations.");
        throw "Could not connect to server."
    }
}

export default postDenominations;