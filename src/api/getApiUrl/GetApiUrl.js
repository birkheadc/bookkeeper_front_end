function getApiUrl() {
    if (process.env.NODE_ENV === 'development') {
        return process.env.REACT_APP_BOOKKEEPER_URL + "/api";
    }
    return "https://" + window.location.host + "/api";
}

export default getApiUrl;