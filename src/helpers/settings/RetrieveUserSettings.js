import { Utils } from "..";

function retrieveUserSettingByName(name) {
    try {
        const settings = JSON.parse(window.localStorage.getItem('settings'));
        const value = settings.userSettings[name].value;
        return value;
    }
    catch {
        Utils.devlog("User settings not found...");
        return {};
    }
    
}

export default retrieveUserSettingByName;