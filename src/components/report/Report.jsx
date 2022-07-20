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
        if (doesEarningOfCategoryExist(converted) === true) {
            alert('That is already being used.');
            return;
        }
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

    function doesEarningOfCategoryExist(category) {
        for (let i = 0; i < report.reports[0].earnings.length; i++) {
            const earning = report.reports[0].earnings[i];
            if (earning.category === category) {
                return true;
            }
        }
        return false;
    }

    function handleAddExpense(category) {
        if (category == null || category === '') {
            return;
        }
        if (TransactionCategoryHelpers.isTransactionNameValid(category) === false) {
            alert('Sorry, that cannot be used.');
            return;
        }
        if (doesExpenseOfCategoryExist(category) === true) {
            alert('That is already being used.');
            return;
        }
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

    function doesExpenseOfCategoryExist(category) {
        for (let i = 0; i < report.reports[0].expenses.length; i++) {
            const expense = report.reports[0].expenses[i];
            if (expense.category === category) {
                return true;
            }
        }
        return false;
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

    // const [searchParams, setSearchParams] = useSearchParams();

    // const [status, setStatus] = useState('start');
    // const [loading, setLoading] = useState(0);

    // const [date, setDate] = useState();

    // const [reportData, setReportData] = useState();

    // useEffect(() => {
    //     console.log(":::REPORT DATA:::")
    //     console.log(reportData);
    // }, [reportData]);f

    // const handleSubmitDate = (e) => {
    //     e.preventDefault();
    //     const date = document.getElementById('report-date-input').value;
    //     if (date == null || date === '') {
    //         return;
    //     }
    //     const params = { date: date };  
    //     setSearchParams(params);
    // }

    // useEffect(() => {

    //     function setDateFromSearchParams() {
    //         if (searchParams.has("date") === false) {
    //             setStatus('no-date');
    //             return;
    //         }
    //         const date = new Date(Date.parse(searchParams.get("date")));
    //         if (isNaN(date) === true) {
    //             setStatus('bad-date');
    //             return;
    //         }
    //         setDate(date);
    //     }

    //     setDateFromSearchParams();

    // }, [searchParams]);

    // useEffect(() => {

    //     function getEarningsFromDefaultAndPresentTransactions(transactionTypes, earnings) {
    //         let types = [];
    //         for (let i = 0; i < transactionTypes.length; i++) {
    //             if ((transactionTypes.name !== 'cash') && (transactionTypes[i].polarity === 1) && (transactionTypes[i].isDefault === true)) {
    //                 if (types.includes(transactionTypes[i].name) === false) {
    //                     types.push(transactionTypes[i].name);
    //                 }
    //             } 
    //         }

    //         for (let i = 0; i < earnings.length; i++) {
    //             if (types.includes(earnings[i].type) === false) {
    //                 types.push(earnings[i].type);
    //             }
    //         }

    //         let earningsOut = [];
    //         for (let i = 0; i < types.length; i++) {
    //             const type = types[i];
    //             let wasPresent = false;
    //             for (let j = 0; j < earnings.length; j++) {
    //                 const earning = earnings[j];
    //                 if (earning.type === type) {
    //                     earningsOut.push(earning);
    //                     wasPresent = true;
    //                     break;
    //                 }
    //             }
    //             if (wasPresent === false) {
    //                 earningsOut.push(
    //                     {
    //                         id: Utils.getNewUUID(),
    //                         date: new Date(),
    //                         type: type,
    //                         amount: 0
    //                     }
    //                 );
    //             }
    //         }
    //         return earningsOut;
    //     }

    //     function getExpensesFromDefaultAndPresentTransactions(transactionTypes, expenses) {
    //         let types = [];
    //         for (let i = 0; i < transactionTypes.length; i++) {
    //             if ((transactionTypes.name !== 'cash') && (transactionTypes[i].polarity === -1) && (transactionTypes[i].isDefault === true)) {
    //                 if (types.includes(transactionTypes[i].name) === false) {
    //                     types.push(transactionTypes[i].name);
    //                 }
    //             } 
    //         }

    //         for (let i = 0; i < expenses.length; i++) {
    //             if (types.includes(expenses[i].type) === false) {
    //                 types.push(expenses[i].type);
    //             }
    //         }

    //         let expensesOut = [];
    //         for (let i = 0; i < types.length; i++) {
    //             const type = types[i];
    //             let wasPresent = false;
    //             for (let j = 0; j < expenses.length; j++) {
    //                 const expense = expenses[j];
    //                 if (expense.type === type) {
    //                     expensesOut.push(expense);
    //                     wasPresent = true;
    //                     break;
    //                 }
    //             }
    //             if (wasPresent === false) {
    //                 expensesOut.push(
    //                     {
    //                         id: Utils.getNewUUID(),
    //                         date: new Date(),
    //                         type: type,
    //                         amount: 0
    //                     }
    //                 );
    //             }
    //         }
    //         return expensesOut;
    //     }

    //     async function fetchAndSetData() {
    //         setLoading(l => l + 1);
    //         setStatus('');
    
    //         const transactionTypes = await Api.fetchTransactionTypes();
    //         const denominations = await Api.fetchDenominations();
    //         const transactions = await Api.fetchTransactionsFromDate(date);
    //         const earnings = getEarningsFromDefaultAndPresentTransactions(transactionTypes, transactions.earnings);
    //         const expenses = getExpensesFromDefaultAndPresentTransactions(transactionTypes, transactions.expenses);
    //         const settings = await Api.fetchSettings();
    //         const isCashDefault = settings.isCashDefault;

    //         const reportData = {
    //             date: LocaleConversions.getDateStringFromDate(date),
    //             earnings: earnings,
    //             expenses: expenses,
    //             transactionTypes: transactionTypes,
    //             denominations: denominations,
    //             isCashDefault: isCashDefault
    //         }

    //         setReportData(reportData);
    //     }

    //     if (date != null) {
    //         fetchAndSetData();
    //     }

    // }, [date]);

    // useEffect(() => {
    //     if (reportData != null) {
    //         setLoading(l => l - 1);
    //     }
    // }, [reportData]);

    // useEffect(() => {
    //     console.log("Loading level: " + loading);
    //     console.log("Status: " + status);
    // }, [loading, status]);

    // function renderSelectReportMethod() {
    //     return(
    //         <div className='select-report-method'>
    //             <div>
    //                 <h3 className='centered'>Select Date</h3>
    //                 <form onSubmit={handleSubmitDate} className='select-report-date-form'>
    //                     <input className='date-input' defaultValue={searchParams.get('date')} id='report-date-input' type='date'></input>
    //                     <button type='submit'>Go</button>
    //                 </form>
    //             </div>
    //             <div>
    //                 <h3>Or <NavLink className='header-link' to="/upload">upload a csv</NavLink></h3>
    //             </div>
    //         </div>
    //     );
    // }

    // function renderBody() {
    //     if (loading > 0) {
    //         return(
    //             <h2>Loading...</h2>
    //         );
    //     }
    //     if (status !== '') {
    //         return (
    //             <h2>{status}</h2>
    //         );
    //     }
    //     return(
    //         <ReportForm updateEarning={updateEarning} updateExpense={updateExpense} reportData={reportData} />
    //         // <ReportForm earnings={reportData.earnings} expenses={reportData.expenses} transactionTypes={reportData.transactionTypes} denominations={reportData.denominations} isCashDefault={reportData.isCashDefault}/>
    //     );
    // }

    // const updateEarning = (id, value) => {
    //     for (let i = 0; i < reportData.earnings.length; i++) {
    //         const earning = reportData.earnings[i];
    //         if (earning.id === id) {
    //             let newEarnings = [...reportData.earnings];
    //             let newEarning = {...newEarnings[i]};
    //             newEarning.amount = value;
    //             newEarnings[i] = newEarning;
                
    //             let newReportData = {...reportData};
    //             newReportData.earnings = newEarnings;
                
    //             setLoading(l => l + 1);
    //             setReportData(newReportData);
    //         }
    //     }
    // }

    // const updateExpense = (id, value) => {
    //     for (let i = 0; i < reportData.expenses.length; i++) {
    //         const expenses = reportData.expenses[i];
    //         if (expenses.id === id) {
    //             let newExpenses = [...reportData.expenses];
    //             let newExpense = {...newExpenses[i]};
    //             newExpense.amount = value;
    //             newExpenses[i] = newExpense;
                
    //             let newReportData = {...reportData};
    //             newReportData.expenses = newExpenses;

    //             setLoading(l => l + 1);
    //             setReportData(newReportData);
    //         }
    //     }
    // }

//     return(
//         <div className='section-wrapper'>
//             <h1>Report</h1>
//             {renderSelectReportMethod()}
//             {renderBody()}
//         </div>
//     );

// }

/////////////////////////////////////////////////////////////////////

//     const [searchParams, setSearchParams] = useSearchParams();

//     const [date, setDate] = useState();

//     const [status, setStatus] = useState('Loading');

//     const [isCashDefault, setCashDefault] = useState();
//     const [types, setTypes] = useState();
//     const [denominations, setDenominations] = useState();

//     const [csv, setCsv] = useState(null);

//     useEffect(() => {
//         setDate(searchParams.get("date"));
//     }, [searchParams]);

//     useEffect(() => {
//         const getData = async () => {
//             setStatus('Loading');
//             try {
//                 let isCashDefault = await Api.fetchSettings();
//                 setCashDefault(isCashDefault.isCashDefault);
//                 let types = await Api.fetchTransactionTypes();
//                 setTypes(types);
//                 let denominations = await Api.fetchDenominations();
//                 setDenominations(denominations);
//                 setStatus('');
//             }
//             catch(e) {
//                 setStatus(e);
//             }
            
//         }
//         getData();
//     }, []);

//     const handleDateChange = (date) => {
//         setSearchParams({ 'date': date});
//     }

//     const beginSubmit = function() {
//         setStatus('Submitting');
//     }

//     const finishSubmit = function() {
//         setStatus('');
//     }

//     const renderPrompt = function() {
//         return <ReportPrompt beginSubmit={beginSubmit} defaultDate={date ? date : new Date().toISOString().substring(0, 10)} finishSubmit={finishSubmit} handleDateChange={handleDateChange} isCashDefault={isCashDefault} transactionTypes={types} denominations={denominations}/>
//     }

//     const handleCsvChange = (e) => {
//         setCsv(e.target.files[0]);
//     }

//     const uploadFile = async () => {
//         if (csv == null) {
//             alert("Please select a file to upload.");
//             return;
//         }
//         beginSubmit();
//         try {
//             console.log(csv);
//             await Api.uploadCsv(csv);
//             finishSubmit();
//         }
//         catch(e) {
//             alert(e);
//             finishSubmit();
//         }
        
//     }

//     const renderUploadLink = function() {
//         return (
//             <form className='report-upload-form bordered padded'>
//                 <h2>Upload by CSV</h2>
//                 <input className='report-input upload-input' id='csv-file' onChange={handleCsvChange} type='file'></input>
//                 <button className='report-submit-button upload-button' onClick={uploadFile} type='button'>Upload</button>
//             </form>
//         );
//     }

//     const render = function() {
//         if (status !== '') {
//             return(
//                 <div className='sub-section-wrapper'>
//                     <h2>{status}</h2>
//                 </div>
//             );
//         }
//         return(
//             <>
//                 {renderPrompt()}
//                 {renderUploadLink()}
//             </>
//         );
//     }
    
//     return(
//         <div className='section-wrapper'>
//             <h1>Report</h1>
//             {render()}
//             {/* {renderPrompt()}
//             {renderUploadLink()} */}
//         </div>
//     );
// }

export default Report;