import React from 'react';
import ReportSummary from '../summary/ReportSummary';
import './ReportForm.css'
import ReportFormEarning from './ReportFormEarning';
import ReportFormExpense from './ReportFormExpense';

function ReportForm(props) {

    const handleAddEarningSelectChange = (e) => {
        const option = e.target.value;
        if (option !== 'default') {
            addEarning(option);
            resetAddEarningSelect();
        }
    }

    function addEarning(category) {
        if (category === 'add-new') {
            const response = prompt('Enter name for category.');
            if (response == null || response === '') {
                return;
            }
            props.addEarning(response);
            return;
        }
        props.addEarning(category);
    }

    function resetAddEarningSelect() {
        const select = document.getElementById('report-form-add-earning-select');
        select.value = 'default';
    }

    const handleAddExpenseSelectChange = (e) => {
        const option = e.target.value;
        if (option !== 'default') {
            addExpense(option);
            resetAddExpenseSelect();
        }
    }

    function addExpense(category) {
        if (category === 'add-new') {
            const response = prompt('Enter name for category.');
            if (response == null || response === '') {
                return;
            }
            props.addExpense(response);
            return;
        }
        props.addExpense(category);
    }

    function resetAddExpenseSelect() {
        const select = document.getElementById('report-form-add-expense-select');
        select.value = 'default';
    }

    function renderEarnings(earnings) {
        return(
            <div>
                <h3 className='centered'>Earnings</h3>
                {earnings.map(
                    earning =>
                    <ReportFormEarning date={props.report.reports[0].date} denominations={props.report.denominations} earning={earning} handleAddDefaultDenominationWithValue={props.handleAddDefaultDenominationWithValue} key={earning.id} removeEarning={props.removeEarning} updateValue={props.updateEarning}/>
                )}
                <select id='report-form-add-earning-select' onChange={handleAddEarningSelectChange}>
                    <option value='default'>Add Earning</option>
                    {props.report.earningCategories.map(
                        category =>
                        <option key={category.name} value={category.name}>{category.name}</option>
                    )}
                    <option value='add-new'>Create New</option>
                </select>
            </div>
        );
    }

    function renderExpenses(expenses) {
        return(
            <div>
                <h3 className='centered'>Expenses</h3>
                {expenses.map(
                    expense =>
                    <ReportFormExpense date={props.report.reports[0].date} denominations={props.report.denominations} expense={expense} handleAddDefaultDenominationWithValue={props.handleAddDefaultDenominationWithValue} key={expense.id} removeExpense={props.removeExpense} updateValue={props.updateExpense}/>
                )}
                <select id='report-form-add-expense-select' onChange={handleAddExpenseSelectChange}>
                    <option value='default'>Add Expense</option>
                    {props.report.expenseCategories.map(
                        category =>
                        <option key={category.name} value={category.name}>{category.name}</option>
                    )}
                    <option value='add-new'>Create New</option>
                </select>
            </div>
        );
    }

    function renderSummary() {
        return(
            <div className='report-preview-wrapper'>
                <h3 className='centered'>Preview</h3>
                <ReportSummary report={props.report.reports[0]}/>
            </div>
        )
    }

    function renderForm() {
        return(
            <>
                <h2>{props.report.date}</h2>
                <form className='report-form' onSubmit={submitReport}>
                    <div className='report-form-body'>
                        <div className='report-form-transactions-wrapper'>
                            {renderEarnings(props.report.reports[0].earnings)}
                            {renderExpenses(props.report.reports[0].expenses)}
                        </div>
                        {renderSummary()}
                    </div>
                    <button type='submit'>Submit</button>
                    
                </form>
            </>
        );
    }

    const submitReport = (e) => {
        e.preventDefault();
        props.submitReport();
    }

    return(
        <div className='report-form-wrapper'>
            {renderForm()}
        </div>
    );
}

export default ReportForm;