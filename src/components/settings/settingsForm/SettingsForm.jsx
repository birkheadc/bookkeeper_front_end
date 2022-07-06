import React from 'react';
import './SettingsForm.css'
import SettingsFormRow from './SettingsFormRow.jsx';

function SettingsForm(props) {

    const handleValueChange = (name, value) => {
        props.handleValueChange(name, value);
    }

    return(
        <div className='settings-sub-section-wrapper'>
            <h2>User Settings</h2>
            <hr></hr>
            <form className='settings-user-settings-form'>
                <SettingsFormRow handleValueChange={handleValueChange} setting={props.settings.userSettings.emailName} />
                <SettingsFormRow handleValueChange={handleValueChange} setting={props.settings.userSettings.emailAddress} />
            </form>
        </div>
    );
}

export default SettingsForm;