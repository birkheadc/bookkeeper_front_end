import React from 'react';
import './SettingWidget.css'

function SettingWidget(props) {

    return(
        <div className='settings-transaction-container'>
            <div className='settings-transaction-row'>
                <div className='settings-preference-row-name'>
                    <label htmlFor={'setting-input-' + props.name}>{props.label}</label>
                </div>
                <div>
                    <input checked={props.value} data-name={props.name} id={'setting-input-' + props.name} onChange={props.handleChange} type={props.type}></input>
                </div>
            </div>
        </div>
    );
}

export default SettingWidget;