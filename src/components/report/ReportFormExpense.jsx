import React from 'react';
import './ReportFormExpense.css'

function ReportFormExpense(props) {

    const handleValueChange = () => {
        const newValue = document.getElementById('expense-input_' + props.expense.id).value * -1;
        props.updateValue(props.expense.id, newValue);
    }

    return(
        <div className='report-form-transaction'>
            <h3>EXPENSE WIDGET: {props.expense.type}</h3>
            <label htmlFor={'expense-input_' + props.expense.id}>Amount</label>
            <input id={'expense-input_' + props.expense.id} type='number' onChange={handleValueChange} value={props.expense.amount * -1}></input>
        </div>
    );
}

export default ReportFormExpense;