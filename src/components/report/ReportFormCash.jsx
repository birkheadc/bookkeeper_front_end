import React from 'react';
import './ReportFormCash.css'

function ReportFormCash(props) {
    return(
        <div className='report-form-transaction'>
            <h3>CASH</h3>
            <h4>VALUE: {props.amount}</h4>
            <h4>CASH IS ACTIVE?: {props.isCashActive.toString()}</h4>
        </div>
    );
}

export default ReportFormCash;