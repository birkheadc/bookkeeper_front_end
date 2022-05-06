import React from 'react';
import './DenominationWidget.css'

function DenominationWidget(props) {

    const getDeleteButtonContents = function() {
        if (props.width < 700) {
            return "X"
        }
        return 'Delete'
    }

    const renderDenominations = function() {
        if (props.denominations == null) {
            return null;
        }
        return (
            <div className='settings-transaction-container'>
                {props.denominations.map(
                    denomination =>
                    <div className='settings-transaction-row' key={denomination.value}>
                        <div className='settings-transaction-row-name'>
                            <label>{denomination.value}</label>
                        </div>
                        <label htmlFor={'denomination-is-default_' + denomination.value}>Display by default?</label>
                        <input data-value={denomination.value} checked={denomination.isDefault} id={'denomination-is-default_' + denomination.value} onChange={props.handleIsDefaultChange} type='checkbox'></input>
                        <button className='settings-transactions-delete-button' data-value={denomination.value} onClick={props.handleDeleteDenomination} type='button'>{getDeleteButtonContents()}</button>
                    </div>
                )}
            </div>
        );
    }

    return(
        <div className='settings-section-wrapper'>
            <h2>Denominations</h2>
            {renderDenominations()}
            <button className='settings-add-button' onClick={props.handleNewDenomination} type='button'>Add New</button>
        </div>
    );
}

export default DenominationWidget;