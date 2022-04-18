import React from 'react';
import './TransactionWidget.css'

function TransactionWidget(props) {

    const handleValueChange = (e) => {
        props.handleValueChange(e);
    }

    const render = function() {
        if (props.transactions == null) {
            return null;
        }
        if (props.polarity > 0) {
            return(
                props.transactions.map(
                    transaction =>
                    <div key={transaction.key}>
                        <label htmlFor={'transaction-widget-value_' + transaction.key}>{transaction.name}</label>
                        <input data-key={transaction.key} data-polarity={transaction.polarity} id={'transaction-widget-value_' + transaction.key} onChange={handleValueChange} type='number' value={transaction.value}></input>
                    </div>
                )
            );
        }
        return(
            props.transactions.map(
                transaction =>
                <div key={transaction.key}>
                    <label htmlFor={'transaction-widget-value_' + transaction.key}>{transaction.name}</label>
                    <input data-key={transaction.key} data-polarity={transaction.polarity} id={'transaction-widget-value_' + transaction.key} onChange={handleValueChange} type='number' value={transaction.value}></input>
                    <label htmlFor={'transaction-widget-add-cash_' + transaction.key}>Add Back Into Cash?</label>
                    <input data-key={transaction.key} id={'transaction-widget-add-cash_' + transaction.key} onChange={props.handleCheckChange} type='checkbox'></input>
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