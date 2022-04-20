import React from 'react';
import './SettingWidget.css'

function SettingWidget(props) {

    return(
        <div>
            <label htmlFor={'setting-input-' + props.name}>{props.label}</label>
            <input checked={props.value} data-name={props.name} id={'setting-input-' + props.name} onChange={props.handleChange} type={props.type}></input>
        </div>
    );
}

export default SettingWidget;