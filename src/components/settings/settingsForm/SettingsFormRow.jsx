import React from 'react';
import { Utils } from '../../../helpers';

function SettingsFormRow(props) {

    const handleValueChange = (e) => {
        const name = e.target.getAttribute('data-name');
        const value = e.target.value;
        props.handleValueChange(name, value);
    }

    try {
        return(
            <div className='settings-user-settings-row'>
                <label htmlFor={'user-setting_' + props.setting.name}>{Utils.camelCaseToTitleCaseSpaces(props.setting.name)}</label>
                <input data-name={props.setting.name} id={'user-setting_' + props.setting.name} onChange={handleValueChange} type='text' value={props.setting.value}></input>
            </div>
        );
    }

    catch {
        return (
            <div className='settings-user-settings-row'>
                <label>ERROR: Setting Missing!</label>
            </div>
        );
    }
}

export default SettingsFormRow;