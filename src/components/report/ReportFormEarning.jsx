import React from 'react';
import './ReportFormEarning.css'
import { TransactionCategoryHelpers } from '../../helpers';

function ReportFormEarning(props) {

    const deleteEarning = (e) => {
        const id = e.target.getAttribute('data-id');
        props.removeEarning(id);
    }

    const handleValueChange = () => {
        const earning = {
            id : props.earning.id,
            category : props.earning.category,
            amount : parseInt(document.getElementById('earning-input_' + props.earning.id).value),
            date : props.date
        };
        props.updateValue(earning);
    }

    function handleCategoryNameChange(name) {
        const earning = {
            id : props.earning.id,
            category : name,
            amount : parseInt(document.getElementById('earning-input_' + props.earning.id).value),
            date : props.date
        };
        props.updateValue(earning);
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
            <button className='link-style-button report-form-transaction-delete-button' data-id={props.earning.id} onClick={deleteEarning} type='button'>X</button>
            <h3 className='report-form-transaction-line'><button className='report-form-transaction-title link-style-button large' onClick={openCategoryChangePrompt}>{TransactionCategoryHelpers.convertTransactionTypeName(props.earning.category)}</button></h3>
            <div className='report-form-transaction-line'>
                <label htmlFor={'earning-input_' + props.earning.id}>₩</label>
                <input id={'earning-input_' + props.earning.id} type='number' onChange={handleValueChange} value={props.earning.amount}></input>
                <button className='report-form-calculator-button' onClick={openCalculator}>Calc</button>
            </div>
        </div>
    );
}

export default ReportFormEarning;