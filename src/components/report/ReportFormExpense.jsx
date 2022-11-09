import React from 'react';
import './ReportFormExpense.css'
import { TransactionCategoryHelpers } from '../../helpers';
import Calculator from '../calculator/Calculator';

function ReportFormExpense(props) {

    const deleteExpense = (e) => {
        const id = e.target.getAttribute('data-id');
        props.removeExpense(id);
    }

    const handleValueChange = (e) => {
        const value = parseInt(e.target.value);
        let newExpense = {...props.expense};
        newExpense.amount = value;
        props.updateValue(newExpense);
    }

    function handleCategoryNameChange(name) {
        let newExpense = {...props.expense};
        newExpense.category = name;
        props.updateValue(newExpense);
    }

    const handleWasTakenFromCashChange = (e) => {
        const wasTakenFromCash = e.target.checked;
        let newExpense = {...props.expense};
        newExpense.wasTakenFromCash = wasTakenFromCash;
        props.updateValue(newExpense);
    }

    const handleNoteChange = (e) => {
        const note = e.target.value;
        let newExpense = {...props.expense};
        newExpense.note = note;
        props.updateValue(newExpense);
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

    const addCalculatorValue = (value) => {
        let newExpense = {...props.expense};
        newExpense.amount = value;
        props.updateValue(newExpense);
    }

    return(
        <div className='report-form-transaction'>
            <button className='link-style-button report-form-transaction-delete-button' data-id={props.expense.id} onClick={deleteExpense} type='button'>X</button>
            <h3 className='report-form-transaction-line'><button className='report-form-transaction-title link-style-button large' onClick={openCategoryChangePrompt}>{TransactionCategoryHelpers.convertTransactionTypeName(props.expense.category)}</button></h3>
            <div className='report-form-transaction-line'>
                <label htmlFor={'expense-input_' + props.expense.id}>₩</label>
                <input className='input-number' id={'expense-input_' + props.expense.id} type='number' onChange={handleValueChange} onClick={(e) => e.target.select()} value={props.expense.amount}></input>
                <Calculator denominations={props.denominations} handleAddDefaultDenominationWithValue={props.handleAddDefaultDenominationWithValue} handleCancel handleSubmit={addCalculatorValue} oldTotal={props.expense.amount}/>
            </div>
            <div className='report-form-transaction-line'>
                <label htmlFor={'expense-add_back_into_cash_' + props.expense.id}>Add Back Into Cash</label>
                <input checked={props.expense.wasTakenFromCash} id={'expense-add_back_into_cash_' + props.expense.id} onChange={handleWasTakenFromCashChange} type='checkbox'></input>
            </div>
            <div className='report-form-transaction-line'>
                <label htmlFor={'expense-note-input_' + props.expense.id}>Note</label>
                <input id={'expense-note-input_' + props.expense.id} type='text' onChange={handleNoteChange} onClick={(e) => e.target.select()} value={props.expense.note}></input>
            </div>
        </div>
    );
}

export default ReportFormExpense;