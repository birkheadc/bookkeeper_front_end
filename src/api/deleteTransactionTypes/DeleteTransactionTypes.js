async function deleteTransactionTypes(transactonTypes) {
    if (process.env.REACT_APP_BOOKKEEPER_URL == null) {
        console.log("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = process.env.REACT_APP_BOOKKEEPER_URL;
    
    const subDir = "/transactiontype";
    const apiUrl = API_URL + subDir;

    if (process.env.NODE_ENV === 'development') {
            console.log("Attempt to delete: ");
            console.log(transactonTypes);
    }

    try {
        let response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Authorization': window.localStorage.getItem('password'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactonTypes)
        });
        if (response.status === 200) {
            console.log("Successfully delete transaction types");
            return;
        }
        console.log("Failed to delete transaction types");
        throw "Failed to delete transaction types."
    }
    catch {
        console.log("Failed to delete transaction types");
        throw "Failed to delete transaction types."
    }

    

}

export default deleteTransactionTypes;