import React, { useEffect, useState } from 'react';
import convertTransactionTypeName from '../../helpers/ConvertTransactionTypeName';
import './TransactionTypeWidget.css'

function TransactionTypeWidget(props) {

    const renderTransactionTypes = function() {
        if (props.transactionTypes == null) {
            return null;
        }
        return (
            props.transactionTypes.map(
                transaction =>
                <div key={transaction.name}>
                    <label>{convertTransactionTypeName(transaction.name)}</label>
                    <select data-name={transaction.name} onChange={props.handlePolarityChange} value={transaction.polarity}>
                        <option value={1}>Earning</option>
                        <option value={-1}>Expense</option>
                    </select>
                    <label htmlFor={'is-default_' + transaction.name}>Display by default?</label>
                    <input checked={transaction.isDefault} data-name={transaction.name} id={'is-default_' + transaction.name} onChange={props.handleIsDefaultChange} type='checkbox'></input>
                    <button data-name={transaction.name} onClick={props.handleDeleteTransaction} type='button'>x</button>
                </div>
            )
        );
    }

    return(
        <div>
            <h2>Transaction Categories</h2>
            {renderTransactionTypes()}
            <button onClick={props.handleNewTransactionType} type='button'>+</button>
        </div>
    );
}

export default TransactionTypeWidget;