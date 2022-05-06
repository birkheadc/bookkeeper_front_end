import React from 'react';
import './Summary.css'

function Summary(props) {

    const countNumActiveDays = function() {
        const isDateActive = function(date) {
            for (let i = 0; i < props.summary.positiveTransactions.length; i++) {
                console.log(date);
                const check = new Date(props.summary.positiveTransactions[i].date.substring(0, 10));
                if (date.getDate() === check.getDate()) {
                    return true;
                }
            }
            return false;
        }

        const endDate = new Date(props.summary.endDate);
        const date = new Date(props.summary.startDate);

        let n = 0;

        while (date <= endDate) {
            if (isDateActive(date)) {
                n++;
            }
            date.setDate(date.getDate() + 1);
        }

        return n;
    }

    const displayTotals = function() {
        let gross = props.summary.gross;
        let net = props.summary.net;
        let numActiveDays = countNumActiveDays();
        let averageGross = gross / numActiveDays;
        let averageNet = net / numActiveDays;

        return (
            <div className='summary-totals'>
                <div>
                    <div className='summary-totals-row'>
                        <h3 className='summary-totals-label '>Gross</h3>
                        <h3 className='text-color summary-totals-value'>{gross}</h3>
                    </div>
                    <div className='summary-totals-row'>
                        <h3 className='summary-totals-label '>Net</h3>
                        <h3 className='text-color summary-totals-value'>{net}</h3>
                    </div>
                </div>
                <div>
                    <div className='summary-totals-row'>
                        <h3 className='summary-totals-label '>Average Gross</h3>
                        <h3 className='text-color summary-totals-value'>{averageGross}</h3>
                    </div>
                    <div className='summary-totals-row'>
                        <h3 className='summary-totals-label '>Average Net</h3>
                        <h3 className='text-color summary-totals-value'>{averageNet}</h3>
                    </div>
                </div>
            </div>
        );
    }

    const getCreateButtonContents = function() {
        if (props.width < process.env.REACT_APP_MOBILE_WIDTH) {
            return 'X';
        }
        return 'Delete';
    }

    const displayTableHead = function() {

        if (props.width < process.env.REACT_APP_MOBILE_WIDTH) {
            return (
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Amount</th>
                    </tr>
                </thead>
            );
        }
        return (
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Note</th>
                </tr>
            </thead>
        );
    }

    const displayTableRow = function(transaction) {

        if (props.width < process.env.REACT_APP_MOBILE_WIDTH) {
            return (
                <tr key={transaction.id}>
                    <td className='home-summary-table-date' data-id={transaction.id} onClick={props.handleEditDate}>{transaction.date.substr(0, 10)}</td>
                    <td className='home-summary-table-date' data-id={transaction.id} onClick={props.handleEditType}>{transaction.type}</td>
                    <td className='home-summary-table-gross' data-id={transaction.id} onClick={props.handleEditAmount}>{transaction.amount}</td>
                    <td className='home-summary-table-button'><button className='home-create-button' data-id={transaction.id} onClick={props.handleDeleteTransaction} id={'transaction-delete_' + transaction.id}>{getCreateButtonContents()}</button></td>
                </tr>
            );
        }

        return (
            <tr key={transaction.id}>
                <td className='home-summary-table-date' data-id={transaction.id} onClick={props.handleEditDate}>{transaction.date.substr(0, 10)}</td>
                <td className='home-summary-table-date' data-id={transaction.id} onClick={props.handleEditType}>{transaction.type}</td>
                <td className='home-summary-table-gross' data-id={transaction.id} onClick={props.handleEditAmount}>{transaction.amount}</td>
                <td className='summary-table-note' data-id={transaction.id} onClick={props.handleEditNote}>{transaction.note}</td>
                <td className='home-summary-table-button'><button className='home-create-button' data-id={transaction.id} onClick={props.handleDeleteTransaction} id={'transaction-delete_' + transaction.id}>{getCreateButtonContents()}</button></td>
            </tr>
        );
    }

    if (props.summary == null) {
        return null;
    }

    return(
        <div className='summary-wrapper bordered padded margined'>
            <div className='summary-date'>
                <h2>{props.summary.startDate.substr(0, 10)}</h2>
                <h2>to</h2>
                <h2>{props.summary.endDate.substr(0, 10)}</h2>
            </div>
            {displayTotals()}
            <h3>Earnings</h3>
            <div className='summary-summaries-container'>
                <table className='summary-table'>
                    {displayTableHead()}
                    <tbody>
                        {props.summary.positiveTransactions.map(
                            transaction =>
                            displayTableRow(transaction)
                        )}
                    </tbody>
                </table>
            </div>

            <h3>Expenses</h3>
            <div className='summary-summaries-container'>
                <table className='summary-table'>
                    {displayTableHead()}
                    <tbody>
                        {props.summary.negativeTransactions.map(
                            transaction =>
                            displayTableRow(transaction)
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Summary;