import React from 'react';
import convertTransactionTypeName from '../../helpers/ConvertTransactionTypeName';
import './TransactionSelect.css'

function TransactionSelect(props) {

    const handleAddTransaction = (e) => {

        // Do nothing if ( Add Another ) is selected
        if (e.target.value !== '$') {
            if (e.target.value === '$create-new') {
                props.promptNewTransaction();
            }
            else {
                props.handleAddTransaction(e.target.value);
            }
        }

        // Reset select position to ( Add Another)
        e.target.value = '$';

    }

    const renderOptions = function() {
        if (props.transactions == null) {
            return null;
        }
        return (
            props.transactions.map(
                transaction =>
                <option key={transaction.name} value={transaction.name}>{convertTransactionTypeName(transaction.name)}</option>
            )
        );
    }

    return(
        <select onChange={handleAddTransaction}>
            <option value='$'>( Add Another )</option>
            {renderOptions()}
            <option value='$create-new'>( Create New )</option>
        </select>
    );
}

export default TransactionSelect;