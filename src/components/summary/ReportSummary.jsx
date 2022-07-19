import React from 'react';
import './ReportSummary.css'
import { LocaleConversions } from '../../helpers';
import { TransactionCategoryHelpers } from '../../helpers';
import { useNavigate } from 'react-router-dom';
import ReportSummaryTableRowEarning from './ReportSummaryTableRowEarning';
import ReportSummaryTableRowExpense from './ReportSummaryTableRowExpense';

function ReportSummary(props) {

    const nav = useNavigate();

    function calculateTotal() {
        let total = 0;
        for (let i = 0; i < props.report.earnings.length; i++) {
            const amount = props.report.earnings[i].amount;
            if (isNaN(amount) === true) {
                continue;
            }
            total += amount;
        }
        for (let i = 0; i < props.report.expenses.length; i++) {
            const amount = props.report.expenses[i].amount;
            if (isNaN(amount) === true) {
                continue;
            }
            if (props.report.expenses[i].wasTakenFromCash === true) {
                total += amount;
            }
            
        }
        return '₩' + LocaleConversions.formatNumber(total);
    }

    function renderEarnings(earnings) {
        if (earnings == null | earnings.length < 1) {
            return null;
        }
        return (
            <tbody>
                {earnings.map(
                earning =>
                <ReportSummaryTableRowEarning earning={earning} key={earning.id} />
            )}
            </tbody>
        );
    }

    function renderExpenses(expenses) {
        if (expenses == null || expenses.length < 1) {
            return null;
        }
        return (
            <tbody>
                {expenses.map(
                expense =>
                <ReportSummaryTableRowExpense expense={expense} key={expense.id} />
            )}
            </tbody>
        );
    }


    const handleEditButton = (e) => {
        const date = e.target.getAttribute('data-date');
        nav('../report?date=' + date);
    }

    function renderEditButton() {
        if (props.addEditButton === true) {
            return (
                <div className='report-summary-edit-button-wrapper'>
                    <button className='report-summary-edit-button' data-date={props.report.date.slice(0, 10)} onClick={handleEditButton} type='button'>Edit</button>
                </div>
            );
        }
    }

    if (props.report.isBlankDay === true) {
        return (
            <div className='report-summary-wrapper disabled-summary'>

            </div>
        );
    }

    return(
        <div className='report-summary-wrapper'>
            <h3>{LocaleConversions.getDateStringFromDate(props.report.date)}</h3>
            <h3>{calculateTotal()}</h3>
            <table className='report-summary-table'>
                {renderEarnings(props.report.earnings)}
                {renderExpenses(props.report.expenses)}
            </table>
            {renderEditButton()}
        </div>
    );
}

export default ReportSummary;