import React from 'react';
import './SettingsForm.css'
import SettingsFormRow from './SettingsFormRow.jsx';
import SettingsFormRowSelect from './SettingsFormRowSelect';

function SettingsForm(props) {

    const handleValueChange = (name, value) => {
        props.handleValueChange(name, value);
    }

    console.log(props.settings.userSettings);

    return(
        <div className='settings-sub-section-wrapper'>
            <h2>User Settings</h2>
            <hr></hr>
            <form className='categories-form'>
                <div className='categories-form-sub-section'>
                    <h3>Email</h3>
                    <SettingsFormRow handleValueChange={handleValueChange} setting={props.settings.userSettings.emailName} />
                    <SettingsFormRow handleValueChange={handleValueChange} setting={props.settings.userSettings.emailAddress} />
                </div>
                <div className='categories-form-sub-section'>
                    <h3>Browsing</h3>
                    <SettingsFormRowSelect choices={['day', 'week', 'month']} handleValueChange={handleValueChange} setting={props.settings.userSettings.defaultBrowseMode} />
                </div>
            </form>
        </div>
    );
}

export default SettingsForm;