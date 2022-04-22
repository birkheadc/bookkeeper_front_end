async function verifyPassword(password) {
    if (process.env.REACT_APP_BOOKKEEPER_URL == null) {
        console.log("Api url not set, aborting.");
        throw "Api url not configured.";
    }
    const API_URL = process.env.REACT_APP_BOOKKEEPER_URL;

    const subDir = "/password/verify";
    const apiUrl = API_URL + subDir;

    if (process.env.NODE_ENV === 'development') {
        console.log("Attempting to verify password at: " + apiUrl);
    }
    
    let response;
    try {
        response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': password
            }
        });
    }
    catch {
        console.log("Unable to connect to verification server.");
        return 404;
    }
    

    if (response.status === 200) {
        console.log("Password is correct");
        return 200;
    }
    if (response.status === 404) {
        console.log("Unable to connect to verification server.");
        return 404;
    }
    console.log("Password is incorrect.");
    return 401;
}

export default verifyPassword;