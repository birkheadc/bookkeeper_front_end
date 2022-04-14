async function fetchTransactionTypes(API_URL) {
    const subDir = "/transactiontype";
    const apiUrl = API_URL + subDir;
    
    console.log("Attempting to fetch transaction types from: " + apiUrl);

    try {
        let response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                Authorization: window.localStorage.getItem('password')
            }
        });
        if (response.status !== 200) {
            console.log("Unable to connect to server");
            return null;
        }
        console.log("Fetched transaction types successfully.");
        let data = await response.json();
        return data;
    }
    catch {
        console.log("Failed to fetch transaction types.");
        return null;
    }
}

export default fetchTransactionTypes;