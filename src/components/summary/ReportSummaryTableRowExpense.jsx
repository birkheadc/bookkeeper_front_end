import React from 'react';  
import { LocaleConversions } from '../../helpers';
import { TransactionCategoryHelpers } from '../../helpers';

function ReportSummaryTableRowExpense(props) {

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
        if (expense.amount === 0) {
            return renderEarningAmount(expense);
        }
        return '-' + renderEarningAmount(expense);
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

    if (props.expense.amount <= 0) {
        return null;
    }

    return(
        <tr>
            <td className='left-align'><span className='overflow'><span>{renderExpenseCategoryName(props.expense)}</span></span></td>
            <td className='right-align'>{renderExpenseAmount(props.expense)}</td>
            {renderNote(props.expense.note)}
        </tr>
    );
}

export default ReportSummaryTableRowExpense;