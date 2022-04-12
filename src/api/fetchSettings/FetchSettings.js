async function fetchSettings(API_URL) {

    const subDir = "/setting";
    const apiUrl = API_URL + subDir;
    
    console.log("Attempting to fetch settings from: " + apiUrl);

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
        console.log("Fetched settings successfully.");
        let data = await response.json();
        return data;
    }
    catch {
        console.log("Failed to fetch settings.");
        return null;
    }
}

export default fetchSettings;