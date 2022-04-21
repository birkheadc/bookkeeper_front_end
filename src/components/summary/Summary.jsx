import React from 'react';

function Summary(props) {



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
                            <td>{transaction.amount}</td>
                            <td>{transaction.type}</td>
                            <td>{transaction.note}</td>
                            <td>{transaction.date.substr(0, 10)}</td>
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
                            <td>{transaction.amount}</td>
                            <td>{transaction.type}</td>
                            <td>{transaction.note}</td>
                            <td>{transaction.date.substr(0, 10)}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Summary;