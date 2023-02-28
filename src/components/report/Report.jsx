import React, { useEffect, useState } from 'react';
import './Report.css'
import { Api } from '../../api';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import ReportForm from './ReportForm';
import { TransactionCategoryHelpers, LocaleConversions } from '../../helpers';
import { Utils } from '../../helpers';

function Report(props) {

    const nav = useNavigate();

    const [searchParams, setSearchParams] = useSearchParams();
    const [status, setStatus] = useState('');
    const [date, setDate] = useState();
    const [report, setReport] = useState();
    const [message, setMessage] = useState();

    useEffect(() => {

        function setDateFromSearchParams() {
            if (searchParams.has("date") === false) {
                setSearchParams({
                    date: new Date().toISOString().slice(0, 10)
                });
                return;
            }
            const date = new Date(Date.parse(searchParams.get("date")));
            if (isNaN(date) === true) {
                setStatus('bad-date');
                return;
            }
            setDate(date);
        }
        clearMessage();
        setDateFromSearchParams();

    }, [searchParams]);

    useEffect(() => {
        function generateEarnings(report) {

            // If there are any earnings for that day, simply return them.
    
            if (report.reports[0].earnings.length > 0) {
                return report.reports[0].earnings;
            }
    
            // If not, make a new earning of amount 0 for each default category, and return that list.
    
            let earnings = [];
    
            for (let i = 0; i < report.earningCategories.length; i++) {
                if (report.earningCategories[i].isDefault === true) {
                    const earning = {
                        id : Utils.getNewUUID(),
                        category : report.earningCategories[i].name,
                        amount : 0,
                        date : report.reports[0].date
                    };
                    earnings.push(earning);
                }
            }
    
            return earnings;
        }
    
        function generateExpenses(report) {
            // If there are any expenses for that day, simply return them.
    
            if (report.reports[0].expenses.length > 0) {
                return report.reports[0].expenses;
            }
    
            // If not, make a new expense of amount 0 for each default category, and return that list.
    
            let expenses = [];
    
            for (let i = 0; i < report.expenseCategories.length; i++) {
                if (report.expenseCategories[i].isDefault === true) {
                    const expense = {
                        id : Utils.getNewUUID(),
                        category : report.expenseCategories[i].name,
                        amount : 0,
                        date : report.reports[0].date,
                        wasTakenFromCash : false,
                        note : ''
                    };
                    expenses.push(expense);
                }
            }
    
            return expenses;
        }
        async function fetchAndSetReport() {
            setStatus('loading');
            const reportData = await Api.fetchReports(date, date);
            reportData.reports[0].expenses = generateExpenses(reportData);
            reportData.reports[0].earnings = generateEarnings(reportData);
            setReport(reportData);
            setStatus('');
        }
        if (date != null) {
            fetchAndSetReport();
        }
    }, [date]);

    const handleChangeDate = (e) => {
        e.preventDefault();
        const date = e.target.value;
        if (date == null || date === '') {
            return;
        }
        const params = { date: date };
        setSearchParams(params);
    }

    function renderSelectReportMethod() {
        if (searchParams.get('date') == null) {
            return null;
        }
        return(
            <div className='select-report-method'>
                <div>
                    <h3 className='centered'>Select Date</h3>
                    <form className='select-report-date-form'>
                        <input value={searchParams.get('date')} id='report-date-input' onChange={handleChangeDate} type='date'></input>
                    </form>
                </div>
                <div>
                    <h3>or</h3>
                </div>
                <div>
                    <h3><NavLink className='header-link' to='/mass-report'>Mass Report</NavLink></h3>
                    <hr></hr>
                    <h3><NavLink className='header-link' to="/upload">Upload CSV</NavLink></h3>
                </div>
            </div>
        );
    }

    const updateEarning = (newEarning) => {
        if (newEarning.amount < 0) {
            newEarning.amount = 0;
        }
        for (let i = 0; i < report.reports[0].earnings.length; i++) {
            const earning = report.reports[0].earnings[i];
            if (earning.id === newEarning.id) {
                let newEarnings = [...report.reports[0].earnings];
                newEarnings[i] = newEarning;
                let newReport = {...report};
                newReport.reports[0].earnings = newEarnings;
                setReport(newReport);
            }
        }
    }

    const updateExpense = (newExpense) => {
        if (newExpense.amount < 0) {
            newExpense.amount = 0;
        }
        for (let i = 0; i < report.reports[0].expenses.length; i++) {
            const expense = report.reports[0].expenses[i];
            if (expense.id === newExpense.id) {
                let newExpenses = [...report.reports[0].expenses];
                newExpenses[i] = newExpense;
                let newReport = {...report};
                newReport.reports[0].expenses = newExpenses;
                setReport(newReport);
            }
        }
    }

    function handleAddEarning(category) {
        if (category == null || category === '') {
            return;
        }

        const converted = TransactionCategoryHelpers.toSnakeCase(category)
        if (TransactionCategoryHelpers.isTransactionNameValid(converted) === false) {
            alert('Sorry, that cannot be used.');
            return;
        }
        // if (doesEarningOfCategoryExist(converted) === true) {
        //     alert('That is already being used.');
        //     return;
        // }
        const earning = {
            id : Utils.getNewUUID(),
            category : converted,
            amount : 0,
            date : report.reports[0].date
        };

        let newEarnings = [...report.reports[0].earnings];
        newEarnings.push(earning);
        let newReport = {...report};
        newReport.reports[0].earnings = newEarnings;
        setReport(newReport);
    }

    // function doesEarningOfCategoryExist(category) {
    //     for (let i = 0; i < report.reports[0].earnings.length; i++) {
    //         const earning = report.reports[0].earnings[i];
    //         if (earning.category === category) {
    //             return true;
    //         }
    //     }
    //     return false;
    // }

    function handleAddExpense(category) {
        if (category == null || category === '') {
            return;
        }
        if (TransactionCategoryHelpers.isTransactionNameValid(category) === false) {
            alert('Sorry, that cannot be used.');
            return;
        }
        // if (doesExpenseOfCategoryExist(category) === true) {
        //     alert('That is already being used.');
        //     return;
        // }
        const expense = {
            id : Utils.getNewUUID(),
            category : category,
            amount : 0,
            date : report.reports[0].date,
            wasTakenFromCash : false,
            note : ''
        };

        let newExpenses = [...report.reports[0].expenses];
        newExpenses.push(expense);
        let newReport = {...report};
        newReport.reports[0].expenses = newExpenses;
        setReport(newReport);
    }

    const removeEarning = (id) => {
        let newEarnings = [...report.reports[0].earnings];
        let j = -1; 
        for (let i = 0; i < newEarnings.length; i++) {
            if (newEarnings[i].id === id) {
                j = i;
                break;
            }
        }
        if (j !== -1) {
            newEarnings.splice(j, 1);
        }
        let newReport = {...report};
        newReport.reports[0].earnings = newEarnings;
        setReport(newReport);
    }

    const removeExpense = (id) => {
        let newExpenses = [...report.reports[0].expenses];
        let j = -1; 
        for (let i = 0; i < newExpenses.length; i++) {
            if (newExpenses[i].id === id) {
                j = i;
                break;
            }
        }
        if (j !== -1) {
            newExpenses.splice(j, 1);
        }
        let newReport = {...report};
        newReport.reports[0].expenses = newExpenses;
        setReport(newReport);
    }

    const addDefaultDenomination = (value) => {
        let newDenominations = [...report.denominations];
        for (let i = 0; i < newDenominations.length; i++) {
            if (newDenominations[i].value === value) {
                return;
            }
        }
        newDenominations.push({
            value: value,
            isDefault: false
        })
        let newReport = {...report};
        newReport.denominations = newDenominations;
        setReport(newReport);
    }

    const submitReport = async () => {
        clearMessage();
        setStatus('Submitting...');
        let response;
        try {
            response = await Api.postReport(report);
        }
        catch {
            displayMessage('Failed to submit.');
            setStatus('');
            return;
        }
        displayMessage('Submitted Successfully!');
        setStatus('');
        nav('../browse?date=' + date.toISOString().slice(0, 10));
    }

    function displayMessage(message) {
        // For now just sets the message, which will cause it to be displayed until cleared.
        setMessage(message);
    }

    function clearMessage() {
        setMessage('');
    }

    function renderMessage() {
        // For now, simply puts the message on the screen and leaves it there until cleared.
        if (message == null || message === '') {
            return null;
        }
        return (
            <div className='report-message-box'>
                <h2>{message}</h2>
            </div>
        );
    }

    function renderBody() {
        if (status !== '' || report == null) {
            return (
                <h2>{status}</h2>
            );
        }
        return(
            <ReportForm addEarning={handleAddEarning} addExpense={handleAddExpense} handleAddDefaultDenominationWithValue={addDefaultDenomination} removeEarning={removeEarning} removeExpense={removeExpense} submitReport={submitReport} updateEarning={updateEarning} updateExpense={updateExpense} report={report} />
        );
    }

    return(
        <div className='section-wrapper'>
            <h1>Report</h1>
            {renderSelectReportMethod()}
            {renderMessage()}
            {renderBody()}
        </div>
    );

}

export default Report;