async function verifyPassword(API_URL, password) {
    const subDir = "/password/verify";
    const apiUrl = API_URL + subDir;
    
    console.log("Attempting to verify password at: " + apiUrl);

    let response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': password
        }
    });

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