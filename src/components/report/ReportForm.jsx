import React from 'react';
import { useState } from 'react';
import ReportSummary from '../summary/ReportSummary';
import './ReportForm.css'
import ReportFormCash from './ReportFormCash';
import ReportFormEarning from './ReportFormEarning';
import ReportFormExpense from './ReportFormExpense';

function ReportForm(props) {

    const [status, setStatus] = useState('');

    function renderEarnings() {
        function splitEarningsByCash(earnings) {
            let nonCashEarnings = [];
            let cashEarning = {};
            for (let i = 0; i < earnings.length; i++) {
                let earning = earnings[i];
                console.log(earning);
                if (earning.type !== 'cash') {
                    nonCashEarnings.push(earning);
                }
                else {
                    cashEarning = earning;
                }
            }
            return {    
                nonCashEarnings: nonCashEarnings,
                cashEarning: cashEarning
            };
        }

        let splitEarnings = splitEarningsByCash(props.reportData.earnings);

        return(
            <div>
                <h3>Earnings</h3>
                <ReportFormCash amount={splitEarnings.cashEarning.amount} denominations={props.reportData.denominations} isCashActive={props.reportData.isCashDefault || splitEarnings.cashEarning.amount > 0}/>
                {splitEarnings.nonCashEarnings.map(
                    earning =>  
                    <ReportFormEarning key={earning.id} earning={earning} updateValue={props.updateEarning}/>
                )}
            </div>
        );
    }

    function renderExpenses() {
        return(
            <div>
                <h3>Expenses</h3>
                {props.reportData.expenses.map(
                    expense =>
                    <ReportFormExpense key={expense.id} expense={expense} updateValue={props.updateExpense}/>
                )}
            </div>
        );
    }

    function renderForm() {
        if (status !== '') {
            return(
                <h2>{status}</h2>
            );
        }
        return(
            <>
                <h2>{props.reportData.date}</h2>
                <form className='report-form' onSubmit={submitReport}>
                    <div className='report-form-body'>
                        {renderEarnings()}
                        {renderExpenses()}
                    </div>
                    <div>
                        <h2 className='centered'>Preview</h2>
                        <ReportSummary />
                    </div>
                    <div className='report-form-button-wrapper'>
                        <button type='submit'>Submit</button>
                    </div>
                    
                </form>
            </>
        );
    }

    const submitReport = (e) => {
        e.preventDefault();
        console.log("Submit report here!");
    }

    if (status !== '') {
        return(
            <h2>{status}</h2>
        );
    }
    return(
        <div className='report-form-wrapper'>
            {renderForm()}
        </div>
    );
}

export default ReportForm;