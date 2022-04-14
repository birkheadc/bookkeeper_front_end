async function fetchDenominations(API_URL) {
    const subDir = "/denomination";
    const apiUrl = API_URL + subDir;
    
    console.log("Attempting to fetch denominations from: " + apiUrl);

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
        console.log("Fetched denominations successfully.");
        let data = await response.json();
        return data;
    }
    catch {
        console.log("Failed to fetch denominations.");
        return null;
    }
}

export default fetchDenominations;