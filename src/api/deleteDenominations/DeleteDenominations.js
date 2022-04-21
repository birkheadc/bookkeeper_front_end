async function deleteDenominations(denominations) {
    if (process.env.REACT_APP_BOOKKEEPER_URL == null) {
        console.log("Api url not set, aborting.");
    }
    const API_URL = process.env.REACT_APP_BOOKKEEPER_URL;
    
    const subDir = "/denomination";
    const apiUrl = API_URL + subDir;

    console.log("Attempt to delete: ");
    console.log(denominations);

    try {
        let response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': window.localStorage.getItem('password'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(denominations)
        });
        if (response.status === 200) {
            console.log("Successfully deleted denominations");
            return;
        }
        console.log("Failed to delete denominations");
    }
    catch {
        console.log("Failed to delete denominations");
    }

    

}

export default deleteDenominations;