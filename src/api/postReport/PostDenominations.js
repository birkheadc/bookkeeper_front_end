async function postDenominations(denominations) {
    if (process.env.REACT_APP_BOOKKEEPER_URL == null) {
        console.log("Api url not set, aborting.");
    }
    const API_URL = process.env.REACT_APP_BOOKKEEPER_URL;
    const subdir = '/denomination';
    const apiUrl = API_URL + subdir;

    console.log("Attempting to post denominations to " + apiUrl);
    console.log("Object to post: ");
    console.log(denominations);

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
        
    }
    catch {
        console.loeg("Failed to post denominations.");
    }
}

export default postDenominations;