function retrieveUserSettingByName(name) {
    const settings = JSON.parse(window.localStorage.getItem('settings'));
    console.log(settings);
    const value = settings.userSettings[name].value;
    console.log(value);
    return value;
}

export default retrieveUserSettingByName;