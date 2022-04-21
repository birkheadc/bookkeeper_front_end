import React from 'react';
import './DenominationWidget.css'

function DenominationWidget(props) {

    const renderDenominations = function() {
        if (props.denominations == null) {
            return null;
        }
        return (
            props.denominations.map(
                denomination =>
                <div key={denomination.value}>
                    <label>{denomination.value}</label>
                    <label htmlFor={'denomination-is-default_' + denomination.value}>Display by default?</label>
                    <input data-value={denomination.value} checked={denomination.isDefault} id={'denomination-is-default_' + denomination.value} onChange={props.handleIsDefaultChange} type='checkbox'></input>
                    <button data-value={denomination.value} onClick={props.handleDeleteDenomination} type='button'>x</button>
                </div>
            )
        );
    }

    return(
        <div>
            <h2>Denominations</h2>
            {renderDenominations()}
            <button onClick={props.handleNewDenomination} type='button'>+</button>
        </div>
    );
}

export default DenominationWidget;