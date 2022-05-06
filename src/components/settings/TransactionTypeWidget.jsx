import React from 'react';
import { TransactionCategoryHelpers } from '../../helpers';
import './TransactionTypeWidget.css'

function TransactionTypeWidget(props) {

    const getDefaultPromptText = function() {
        if (props.width < 500) {
            return '';
        }
        if (props.width < 700) {
            return 'Default?';
        }
        return 'Display by default?';
    }

    const getDeleteButtonContents = function() {
        if (props.width < 700) {
            return "X"
        }
        return 'Delete'
    }

    const renderTransactionTypes = function() {
        if (props.transactionTypes == null) {
            return null;
        }
        return (
            <div className='settings-transaction-container'>
                {props.transactionTypes.map(
                    transaction =>
                    <div className='settings-transaction-row' key={transaction.name}>
                        <div className='settings-transaction-row-name'>
                            <label>{TransactionCategoryHelpers.convertTransactionTypeName(transaction.name)}</label>
                        </div>
                        <div>
                            <select className='report-input' data-name={transaction.name} onChange={props.handlePolarityChange} value={transaction.polarity}>
                                <option value={1}>Earning</option>
                                <option value={-1}>Expense</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor={'is-default_' + transaction.name}>{getDefaultPromptText()}</label>
                        </div>
                        <div>
                            <input checked={transaction.isDefault} data-name={transaction.name} id={'is-default_' + transaction.name} onChange={props.handleIsDefaultChange} type='checkbox'></input>
                        </div>
                        <div>
                        <button className='settings-transactions-delete-button' data-name={transaction.name} onClick={props.handleDeleteTransaction} type='button'>{getDeleteButtonContents()}</button>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return(
        <div className='settings-section-wrapper'>
            <h2>Transaction Categories</h2>
            {renderTransactionTypes()}
            <button className='settings-add-button' onClick={props.handleNewTransactionType} type='button'>Add New</button>
        </div>
    );
}

export default TransactionTypeWidget;