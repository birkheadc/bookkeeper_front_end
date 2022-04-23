import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './SummaryPage.css'
import { Api } from '../../api';
import Summary from './Summary';
import SummaryPrompt from './SummaryPrompt';
import { TransactionCategoryHelpers, Utils, NoteHelpers } from '../../helpers'
import deleteTransaction from '../../api/deleteTransaction/DeleteTransaction';

function SummaryPage(props) {

    const statuses = {
        'working' : 'Working...',
        'loading' : 'Loading...',
        'error' : 'Error connecting to server.',
        'ready' : ''
    }

    const [searchParams, setSearchParams] = useSearchParams();

    const [status, setStatus] = useState('');

    // Dates are stored as seconds since epoch
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    // Summary is fetched from api. Expected form:
    // {
    //     "StartDate": "yyyy-MM-dd",
    //     "EndDate": "yyyy-MM-dd",
    //     "Gross": 999999,
    //     "Net": 999999,
    //     "PositiveTransactions": [
    //         {
    //             "Id": 000-000-000-000,
    //             "Date": "yyyy-MM-dd",
    //             "Type": "typeoftransaction",
    //             "Amount": 999,
    //             "Note": "note about transaction"
    //         },
    //         {
    //             "Id": 000-000-000-000,
    //             "Date": "yyyy-MM-dd",
    //             "Type": "typeoftransaction",
    //             "Amount": 999,
    //             "Note": "note about transaction"
    //         }
    //     ],
    //     "NegativeTransactions": [
    //         {
    //             "Id": 000-000-000-000,
    //             "Date": "yyyy-MM-dd",
    //             "Type": "typeoftransaction",
    //             "Amount": -999,
    //             "Note": "note about transaction"
    //         },
    //         {
    //             "Id": 000-000-000-000,
    //             "Date": "yyyy-MM-dd",
    //             "Type": "typeoftransaction",
    //             "Amount": -999,
    //             "Note": "note about transaction"
    //         }
    //     ],
    // }
    const [summary, setSummary] = useState();

    // Runs when search parameters change
    useEffect(() => {
        setStartDate(Date.parse(searchParams.get("startDate")));
        setEndDate(Date.parse(searchParams.get("endDate")));
    }, [searchParams]);

    // Runs when start and/or end date change
    useEffect(() => {

        setSummary(null);
        setStatus(statuses.ready);

        if (searchParams.get("startDate") === null || searchParams.get("endDate") === null) {
            setStatus("Please select date(s) to search.");
            return;
        }

        if (isNaN(startDate) || isNaN(endDate)) {
            setStatus("Bad format.");
            return;
        }

        if (endDate < startDate) {
            setStatus("Start date must be before or the same as end date.");
            return;
        }

        const getSummary = async () => {
            setStatus(statuses.loading);
            try {
                const summary = await Api.fetchSummary(startDate, endDate);
                if (summary === null) {
                    setStatus(statuses.error);
                    return;
                }
                setSummary(summary);
                setStatus(statuses.ready);
            }
            catch(e) {
                setStatus(e);
            }
        }

        getSummary();
    }, [startDate, endDate]);

    const getTransactionById = function(id) {
        let transactions = [...summary.positiveTransactions, ...summary.negativeTransactions];
        for (let i = 0; i < transactions.length; i++) {
            Utils.devlog(transactions[i]);
            Utils.devlog('id = ' + id);
            if (transactions[i].id === id) {
                return transactions[i];
            }
        }
        Utils.devlog("Failed to find transaction to delete...");
        return undefined;
    }

    const updateTransaction = async function(transaction) {
        try {
            await Api.updateTransactions([transaction]);
            window.location.reload();
        }
        catch {
            Utils.devlog("Failed to update transactions");
        }
    }

    const handleDeleteTransaction = async (e) => {
        const id = e.target.getAttribute('data-id');
        const transaction = getTransactionById(id);
        if (window.confirm('Really delete ' + transaction.type.toUpperCase() + ' of amount ' + transaction.amount + ' on ' + transaction.date.substring(0, 10) + '?')) {
            try {
                setStatus(statuses.working);
                await deleteTransaction(id);
                window.location.reload();
            }
            catch {
                setStatus(statuses.ready);
                alert("Failed to delete transaction.")
            }
        }
    }

    const handleEditAmount = (e) => {
        const id = e.target.getAttribute('data-id');
        const transaction=getTransactionById(id);
        const amount = prompt("Input new amount.");
        if (isNaN(amount) === true || amount % 1 !== 0) {
            alert("You must input a whole number.");
            return;
        }
        transaction.amount =parseInt(amount);
        updateTransaction(transaction);
    }

    const handleEditType = (e) => {
        const id = e.target.getAttribute('data-id');
        const transaction=getTransactionById(id);
        const type = prompt("Input name of new category.");
        if (TransactionCategoryHelpers.isTransactionNameValid(type) === false) {
            alert("Category name may only contain letters, spaces, _ and/or -");
            return;
        }
        transaction.type = type;
        updateTransaction(transaction);
        
    }

    const handleEditNote = (e) => {
        const id = e.target.getAttribute('data-id');
        const transaction=getTransactionById(id);
        const note = prompt("Input new note.");
        if (NoteHelpers.isNoteNameValid(note) === false) {
            alert("Notes may only contain letters, spaces, _ and/or -");
            return;
        }
        transaction.note = note;
        updateTransaction(transaction);
    }

    const handleEditDate = (e) => {
        alert("Sorry, date cannot be changed!");
    }

    const handleEditTransaction = (e) => {
        Utils.devlog('edit: ' + e.target.getAttribute('data-id'));
    }

    const displaySummary = function() {
        if (status !== '') {
            return (
                <h2>{status}</h2>
            );
        }
        return (
            <Summary handleDeleteTransaction={handleDeleteTransaction} handleEditAmount={handleEditAmount} handleEditDate={handleEditDate} handleEditNote={handleEditNote} handleEditType={handleEditType} handleEditTransaction={handleEditTransaction} summary={summary} />
        );
    }

    const displayPrompt = function() {
        if (status === statuses.working || status === statuses.loading) {
            return null;
        }
        return (
            <SummaryPrompt />
        );
    }

    return(
        <div>
            <h1>Summary</h1>
            {displaySummary()}
            {displayPrompt()}
        </div>
    );
}

export default SummaryPage;