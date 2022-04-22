async function deleteDenominations(denominations) {
    if (process.env.REACT_APP_BOOKKEEPER_URL == null) {
        console.log("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = process.env.REACT_APP_BOOKKEEPER_URL;
    
    const subDir = "/denomination";
    const apiUrl = API_URL + subDir;

    if (process.env.NODE_ENV === 'development') {
        console.log("Attempt to delete: ");
        console.log(denominations);
    }

    try {
        let response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': window.localStorage.getItem('password'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(denominations)
        });
        if (response.status !== 200) {
            console.log("Failed to delete denominations");
            throw "Could not connect to server.";
        }
        console.log("Successfully deleted denominations");
        return;
    }
    catch {
        console.log("Failed to delete denominations");
        throw "Could not connect to server.";
    }

    

}

export default deleteDenominations;