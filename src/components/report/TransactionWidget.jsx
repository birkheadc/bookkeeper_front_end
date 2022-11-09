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
                <div className='transaction-widgets-container'>
                    {props.transactions.map(
                        transaction =>
                        <div className='transaction-widget' key={transaction.key}>
                            <h4>{transaction.name}</h4>
                            <div className='report-transactions-row'>
                            <div className='report-transactions-row-section'>
                                    <label className='report-transactions-label' htmlFor={'transaction-widget-value_' + transaction.key}>Amount</label>
                                    <input className='report-transactions-input report-input' data-key={transaction.key} data-polarity={transaction.polarity} id={'transaction-widget-value_' + transaction.key} onChange={props.handleValueChange} type='number' value={transaction.value}></input>
                                </div>
                                <div className='report-transactions-row-section'>
                                    <label className='report-transactions-label' htmlFor={'transaction-widget-note_' + transaction.key}>Note</label>
                                    <input className='report-transactions-input report-input' data-key={transaction.key} data-polarity={transaction.polarity} id={'transaction-widget-note_' + transaction.key} onChange={props.handleNoteChange} value={transaction.note}></input>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            );
        }
        return(
            <div className='transaction-widgets-container'>
                {props.transactions.map(
                    transaction =>
                    <div className='transaction-widget' key={transaction.key}>
                        <h4>{transaction.name}</h4>
                        <div className='report-transactions-row'>
                            <div className='report-transactions-row-section'>
                                <label className='report-transactions-label' htmlFor={'transaction-widget-value_' + transaction.key}>Amount</label>
                                <input className='report-transactions-input report-input' data-key={transaction.key} data-polarity={transaction.polarity} id={'transaction-widget-value_' + transaction.key} onChange={props.handleValueChange} type='number' value={transaction.value}></input>
                            </div>
                            <div className='report-transactions-row-section'>
                                <label className='report-transactions-label' htmlFor={'transaction-widget-note_' + transaction.key}>Note</label>
                                <input className='report-transactions-input report-input' data-key={transaction.key} data-polarity={transaction.polarity} id={'transaction-widget-note_' + transaction.key} onChange={props.handleNoteChange} value={transaction.note}></input>
                            </div>
                            <div className='report-transactions-row-section'>
                                <label htmlFor={'transaction-widget-add-cash_' + transaction.key}>Add Back Into Cash?</label>
                                <input className='report-transactions-input' data-key={transaction.key} id={'transaction-widget-add-cash_' + transaction.key} onChange={props.handleCheckChange} type='checkbox'></input>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
    return(
        render()
    );
}

export default TransactionWidget;