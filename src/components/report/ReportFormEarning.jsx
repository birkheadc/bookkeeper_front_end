import React from 'react';
import './ReportFormEarning.css'

function ReportFormEarning(props) {

    const handleValueChange = () => {
        const newValue = document.getElementById('earning-input_' + props.earning.id).value;
        props.updateValue(props.earning.id, newValue);
    }

    if (props.earning == null) {
        return null;
    }
    return(
        <div className='report-form-transaction'>
            <h3>EARNING WIDGET: {props.earning.type}</h3>
            <label htmlFor={'earning-input_' + props.earning.id}>Amount</label>
            <input id={'earning-input_' + props.earning.id} type='number' onChange={handleValueChange} value={props.earning.amount}></input>
        </div>
    );
}

export default ReportFormEarning;