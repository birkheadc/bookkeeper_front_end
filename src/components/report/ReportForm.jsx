import React from 'react';
import ReportSummary from '../summary/ReportSummary';
import './ReportForm.css'
import ReportFormEarning from './ReportFormEarning';
import ReportFormExpense from './ReportFormExpense';

function ReportForm(props) {

    function renderEarnings(earnings) {
        return(
            <div>
                <h3 className='centered'>Earnings</h3>
                {earnings.map(
                    earning =>
                    <ReportFormEarning date={props.report.reports[0].date} earning={earning} key={earning.id} removeEarning={props.removeEarning} updateValue={props.updateEarning}/>
                )}
                <button onClick={props.addEarning} type='button'>+</button>
            </div>
        );
    }

    function renderExpenses(expenses) {
        return(
            <div>
                <h3 className='centered'>Expenses</h3>
                {expenses.map(
                    expense =>
                    <ReportFormExpense date={props.report.reports[0].date} expense={expense} key={expense.id} removeExpense={props.removeExpense} updateValue={props.updateExpense}/>
                )}
                <button onClick={props.addExpense} type='button'>+</button>
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