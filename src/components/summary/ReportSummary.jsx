import React from 'react';
import './ReportSummary.css'
import { LocaleConversions } from '../../helpers';
import { TransactionCategoryHelpers } from '../../helpers';
import { useNavigate } from 'react-router-dom';

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

    function renderExpenseCategoryName(expense) {
        if (expense.wasTakenFromCash === true) {
            return (
                '*' + TransactionCategoryHelpers.convertTransactionTypeName(expense.category)
            );
        }
        return (
            TransactionCategoryHelpers.convertTransactionTypeName(expense.category)
        );
    }

    function renderEarningAmount(earning) {
        if (isNaN(earning.amount) === true) {
            return 0;
        }
        return LocaleConversions.formatNumber(earning.amount);
    }

    function renderExpenseAmount(expense) {
        return '-' + renderEarningAmount(expense);
    }

    function renderEarnings(earnings) {
        if (earnings == null | earnings.length < 1) {
            return null;
        }
        return (
            <tbody>
                {earnings.map(
                earning =>
                <tr key={earning.id}>
                    <td className='left-align'><span className='overflow'><span>{TransactionCategoryHelpers.convertTransactionTypeName(earning.category)}</span></span></td>
                    <td className='right-align'>{renderEarningAmount(earning)}</td>
                </tr>
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
                <tr key={expense.id}>
                    <td className='left-align'><span className='overflow'><span>{renderExpenseCategoryName(expense)}</span></span></td>
                    <td className='right-align'>{renderExpenseAmount(expense)}</td>
                    {renderNote(expense.note)}
                </tr>
            )}
            </tbody>
        );
    }
    
    const handleViewNote = (e) => {
        e.preventDefault();
        const note = e.target.getAttribute('data-note');
        alert(note);
    }

    function renderNote(note) {
        if (note == null || note === '') {
            return null;
        }
        return (
            <td><div className='tooltip'>
                <button className='link-style-button small' data-note={note} onClick={handleViewNote}>Note</button>
                <span className='tooltiptext'>{note}</span>
            </div></td>
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
            <div className='report-summary-wrapper'>

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