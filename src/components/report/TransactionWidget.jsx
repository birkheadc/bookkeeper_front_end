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
        return(
            props.transactions.map(
                transaction =>
                <div key={transaction.key}>
                    <label htmlFor={'transaction-widget-value_' + transaction.key}>{transaction.name}</label>
                    <input data-key={transaction.key} data-polarity={transaction.polarity} id={'transaction-widget-value_' + transaction.key} onChange={handleValueChange} type='number' value={transaction.value}></input>
                    <input data-key={transaction.key} type='checkbox'></input>
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