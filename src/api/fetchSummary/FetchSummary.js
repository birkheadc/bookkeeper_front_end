async function fetchSummary(startDate, endDate) {

    if (process.env.REACT_APP_BOOKKEEPER_URL == null) {
        console.log("Api url not set, aborting.");
    }
    const API_URL = process.env.REACT_APP_BOOKKEEPER_URL;

    console.log("Attempting to fetch summary: " + startDate + " ~ " + endDate);

    const subDir = "/transaction/summary";
    const apiUrl = API_URL + subDir;

    const queryString = "?startDate=" + new Date(startDate).toLocaleDateString().replace(/\//g, '-') + "&endDate=" + new Date(endDate).toLocaleDateString().replace(/\//g, '-')
    console.log("Attempting to fetch summary from " + apiUrl + queryString);
    try {
        let response = await fetch(apiUrl + queryString, {
            method: 'GET',
            headers: {
                Authorization: window.localStorage.getItem('password')
            }
        });
        if (response.status !== 200) {
            console.log("Failed to fetch summary. Access denied.");
            return null;
        }
        let data = await response.json();
        console.log("Successfully fetched summary.");
        return data;
    }
    catch {
        console.log("Failed to fetch summary.");
        return null;
    }
}

export default fetchSummary;