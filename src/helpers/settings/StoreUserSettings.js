function storeUserSettings(settings) {
    window.localStorage.setItem('settings', JSON.stringify(settings));
}

export default storeUserSettings;