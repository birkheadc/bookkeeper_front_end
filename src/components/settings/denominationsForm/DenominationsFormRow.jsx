import React from 'react';

function DenominationsFormRow(props) {

    const handleChangeIsDefault = (e) => {
        const value = e.target.getAttribute('data-value');
        const isDefault = e.target.checked;
        props.handleChangeIsDefault(value, isDefault);
    }

    const handleDeleteDenomination = (e) => {
        const value = e.target.getAttribute('data-value');
        props.handleDeleteDenomination(value);
    }

    return(
        <div>
            <label htmlFor={'denomination-checkbox_' + props.denomination.value}>{props.denomination.value}</label>
            <input data-value={props.denomination.value} id={'denomination-checkbox_' + props.denomination.value} onChange={handleChangeIsDefault} type='checkbox' checked={props.denomination.isDefault}></input>
            <button data-value={props.denomination.value} onClick={handleDeleteDenomination} type='button'>x</button>
        </div>
    );
}

export default DenominationsFormRow;