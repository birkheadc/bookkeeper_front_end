import { Utils } from "..";

function retrieveUserSettingByName(name) {
    try {
        const settings = JSON.parse(window.localStorage.getItem('settings'));
        console.log(settings);
        const value = settings.userSettings[name].value;
        console.log(value);
        return value;
    }
    catch {
        Utils.devlog("User settings not found...");
        return {};
    }
    
}

export default retrieveUserSettingByName;