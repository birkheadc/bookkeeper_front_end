import React from 'react';
import './ReportFormExpense.css'
import { TransactionCategoryHelpers } from '../../helpers';

function ReportFormExpense(props) {

    const deleteExpense = (e) => {
        const id = e.target.getAttribute('data-id');
        props.removeExpense(id);
    }

    const handleValueChange = () => {
        const expense = {
            id : props.expense.id,
            category : props.expense.category,
            amount : parseInt(document.getElementById('expense-input_' + props.expense.id).value),
            date : props.date,
            note : document.getElementById('expense-note-input_' + props.expense.id).value,
            wasTakenFromCash : document.getElementById('expense-add_back_into_cash_' + props.expense.id).checked,
        };
        props.updateValue(expense);
    }

    function handleCategoryNameChange(name) {
        const expense = {
            id : props.expense.id,
            category : name,
            amount : parseInt(document.getElementById('expense-input_' + props.expense.id).value),
            date : props.date,
            note : document.getElementById('expense-note-input_' + props.expense.id).value,
            wasTakenFromCash : document.getElementById('expense-add_back_into_cash_' + props.expense.id).checked,
        };
        props.updateValue(expense);
    }

    const openCategoryChangePrompt = (e) => {
        e.preventDefault();
        let response = prompt("Please select a new category.")
        if (response == null || response === '') {
            return;
        }
        if (TransactionCategoryHelpers.isTransactionNameValid(response) === false) {
            alert('Sorry, that cannot be used.');
            return;
        }
        handleCategoryNameChange(response);
    }

    const openCalculator = () => {
        // TODO
        alert('Sorry, calculator is not yet implemented.');
    }

    return(
        <div className='report-form-transaction'>
            <button className='link-style-button report-form-transaction-delete-button' data-id={props.expense.id} onClick={deleteExpense} type='button'>X</button>
            <h3 className='report-form-transaction-line'><button className='report-form-transaction-title link-style-button large' onClick={openCategoryChangePrompt}>{TransactionCategoryHelpers.convertTransactionTypeName(props.expense.category)}</button></h3>
            <div className='report-form-transaction-line'>
                <label htmlFor={'expense-input_' + props.expense.id}>₩</label>
                <input id={'expense-input_' + props.expense.id} type='number' onChange={handleValueChange} value={props.expense.amount}></input>
                <button className='report-form-calculator-button' onClick={openCalculator}>Calc</button>
            </div>
            <div className='report-form-transaction-line'>
                <label htmlFor={'expense-add_back_into_cash_' + props.expense.id}>Add Back Into Cash</label>
                <input checked={props.expense.wasTakenFromCash} id={'expense-add_back_into_cash_' + props.expense.id} onChange={handleValueChange} type='checkbox'></input>
            </div>
            <div className='report-form-transaction-line'>
                <label htmlFor={'expense-note-input_' + props.expense.id}>Note</label>
                <input id={'expense-note-input_' + props.expense.id} type='text' onChange={handleValueChange} value={props.expense.note}></input>
            </div>
        </div>
    );
}

export default ReportFormExpense;