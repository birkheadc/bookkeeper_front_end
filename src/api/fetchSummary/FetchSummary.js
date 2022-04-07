async function fetchSummary(API_URL, startDate, endDate) {

    console.log("Attempting to fetch summary: " + startDate + " ~ " + endDate);

    // TODO: Change this definitely.
    const password = process.env.REACT_APP_BOOKKEEPER_PASSWORD;

    const subDir = "/transactions/summary";
    const apiUrl = API_URL + subDir;

    const queryString = "?startDate=" + new Date(startDate).toLocaleDateString().replace(/\//g, '-') + "&endDate=" + new Date(endDate).toLocaleDateString().replace(/\//g, '-')
    console.log("Attempting to fetch summary from " + apiUrl + queryString);
    try {
        let response = await fetch(apiUrl + queryString);
        let data = await response.json();
        console.log("Successfully fetched summary.");
        return data;
    }
    catch {
        console.log("Failed to fetch summary.");
        return {};
    }
}

export default fetchSummary;