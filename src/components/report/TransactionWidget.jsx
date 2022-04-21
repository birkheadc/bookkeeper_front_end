import React from 'react';
import './TransactionWidget.css'

function TransactionWidget(props) {

    const render = function() {
        if (props.transactions == null) {
            return null;
        }
        // TODO: Refactor this to be more DRY
        if (props.polarity > 0) {
            return(
                props.transactions.map(
                    transaction =>
                    <div key={transaction.key}>
                        <label htmlFor={'transaction-widget-value_' + transaction.key}>{transaction.name}</label>
                        <input data-key={transaction.key} data-polarity={transaction.polarity} id={'transaction-widget-value_' + transaction.key} onChange={props.handleValueChange} type='number' value={transaction.value}></input>
                        <label htmlFor={'transaction-widget-note_' + transaction.key}>Note:</label>
                        <input data-key={transaction.key} data-polarity={transaction.polarity} id={'transaction-widget-note_' + transaction.key} onChange={props.handleNoteChange} value={transaction.note}></input>
                    </div>
                )
            );
        }
        return(
            props.transactions.map(
                transaction =>
                <div key={transaction.key}>
                    <label htmlFor={'transaction-widget-value_' + transaction.key}>{transaction.name}</label>
                    <input data-key={transaction.key} data-polarity={transaction.polarity} id={'transaction-widget-value_' + transaction.key} onChange={props.handleValueChange} type='number' value={transaction.value}></input>
                    <label htmlFor={'transaction-widget-add-cash_' + transaction.key}>Add Back Into Cash?</label>
                    <input data-key={transaction.key} id={'transaction-widget-add-cash_' + transaction.key} onChange={props.handleCheckChange} type='checkbox'></input>
                    <label htmlFor={'transaction-widget-note_' + transaction.key}>Note:</label>
                    <input id={'transaction-widget-note_' + transaction.key} onChange={props.handleNoteChange} value={transaction.note}></input>
                </div>
            )
        );
    }
    return(
        <div>
            {render()}
        </div>
    );
}

export default TransactionWidget;