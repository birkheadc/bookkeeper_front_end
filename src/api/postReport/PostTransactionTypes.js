async function postTransactionTypes(transactionTypes) {
    if (process.env.REACT_APP_BOOKKEEPER_URL == null) {
        console.log("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = process.env.REACT_APP_BOOKKEEPER_URL;

    const subdir = '/transactiontype';
    const apiUrl = API_URL + subdir;

    if (process.env.NODE_ENV === 'development') {
        console.log("Attempting to post TRANSACTION TYPES to " + apiUrl);
        console.log("Object to post: ");
        console.log(transactionTypes);
    }

    try {
        let response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': window.localStorage.getItem('password'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionTypes)
        })
        if (response.status === 200) {
            console.log("Successfully posted transaction types.");
            return;
        }
        console.log("Failed to post transaction types.");
        throw "Could not connect to server."
        
    }
    catch {
        console.log("Failed to post transaction types.");
        throw "Could not connect to server."
    }
}

export default postTransactionTypes;