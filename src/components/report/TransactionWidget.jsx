import React from 'react';
import './TransactionWidget.css'

function TransactionWidget(props) {

    const render = function() {
        if (props.transactions == null) {
            return null;
        }
        return(
            props.transactions.map(
                transaction =>
                <div key={transaction.name}>{transaction.name}</div>
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