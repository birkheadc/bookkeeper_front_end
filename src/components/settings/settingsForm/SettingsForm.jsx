import React from 'react';
import './SettingsForm.css'

function SettingsForm(props) {

    function renderRows() {

        for (let i = 0; i < settingNames.length; i++) {
            
        }
    }

    return(
        <div>
            <h2>User Settings</h2>
            <form className='settings-user-settings-form'>
                {renderRows()}
            </form>
        </div>
    );
}

export default SettingsForm;