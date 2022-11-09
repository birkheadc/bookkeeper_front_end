import React from 'react';
import { Utils } from '../../../helpers';

function SettingsFormRowSelect(props) {

    const handleValueChange = (e) => {
        const name = e.target.getAttribute('data-name');
        const value = e.target.value;
        props.handleValueChange(name, value);
    }

    try {
        return(
            <div className='settings-user-settings-row'>
                <label htmlFor={'user-setting_' + props.setting.name}>{Utils.camelCaseToTitleCaseSpaces(props.setting.name)}</label>
                <select data-name={props.setting.name} id={'user-setting_' + props.setting.name} onChange={handleValueChange} value={props.setting.value}>
                    {props.choices.map(
                        choice =>
                        <option key={choice} value={choice}>{Utils.camelCaseToTitleCaseSpaces(choice)}</option>
                    )}
                </select>
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

export default SettingsFormRowSelect;