import React from 'react';
import './Summary.css'

function Summary(props) {

    const test = () => {
        console.log('test');
    }

    if (props.summary == null) {
        return null;
    }
    return(
        <div>
            <h2>{props.summary.startDate.substr(0, 10)} to {props.summary.endDate.substr(0, 10)}</h2>
            <h3>Gross: {props.summary.gross}</h3>
            <h3>Net: {props.summary.net}</h3>

            <h3>Earnings</h3>
            <table>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Note</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {props.summary.positiveTransactions.map(
                        transaction =>
                        
                        <tr key={transaction.id}>    
                            <td data-id={transaction.id} onClick={props.handleEditAmount}>{transaction.amount}</td>
                            <td data-id={transaction.id} onClick={props.handleEditType}>{transaction.type}</td>
                            <td data-id={transaction.id} onClick={props.handleEditNote}>{transaction.note}</td>
                            <td data-id={transaction.id} onClick={props.handleEditDate}>{transaction.date.substr(0, 10)}</td>
                            <td><button data-id={transaction.id} onClick={props.handleDeleteTransaction} id={'transaction-delete_' + transaction.id}>Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>

            <h3>Expenses</h3>
            <table>
                <thead>
                    <tr>
                        <th>Amount</th>
                        <th>Type</th>
                        <th>Note</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody>
                    {props.summary.negativeTransactions.map(
                        transaction =>
                        
                        <tr key={transaction.id}>
                            <td onClick={props.handleEditAmount}>{transaction.amount}</td>
                            <td onClick={props.handleEditType}>{transaction.type}</td>
                            <td onClick={props.handleEditNote}>{transaction.note}</td>
                            <td onClick={props.handleEditDate}>{transaction.date.substr(0, 10)}</td>
                            <td><button data-id={transaction.id} onClick={props.handleDeleteTransaction} id={'transaction-delete_' + transaction.id}>Delete</button></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Summary;