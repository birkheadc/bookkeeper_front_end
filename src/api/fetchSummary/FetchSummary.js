async function fetchSummary(startDate, endDate) {
    if (process.env.REACT_APP_BOOKKEEPER_URL == null) {
        console.log("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = process.env.REACT_APP_BOOKKEEPER_URL;

    const subDir = "/transaction/summary";
    const apiUrl = API_URL + subDir;

    const queryString = "?startDate=" + new Date(startDate).toLocaleDateString().replace(/\//g, '-') + "&endDate=" + new Date(endDate).toLocaleDateString().replace(/\//g, '-')
    
    if (process.env.NODE_ENV === 'development') {
        console.log("Attempting to fetch SUMMARY from " + apiUrl + queryString);
    }

    try {
        let response = await fetch(apiUrl + queryString, {
            method: 'GET',
            headers: {
                Authorization: window.localStorage.getItem('password')
            }
        });
        if (response.status !== 200) {
            console.log("Failed to fetch summary. Access denied.");
            throw "Could not connect to server."
        }
        let data = await response.json();
        console.log("Successfully fetched summary.");
        return data;
    }
    catch {
        console.log("Failed to fetch summary.");
        throw "Could not connect to server."
    }
}

export default fetchSummary;