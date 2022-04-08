import React from 'react';
import './SummaryPrompt.css'

function SummaryPrompt(props) {

    const handleSingleDayCheckChange = (e) => {
        let endDate = document.getElementById('end-date');
        let isSingleDay = e.target.checked;
        if (isSingleDay === true) {
            endDate.disable
        }
    }

    return(
        <>
            <h2>Select date(s)</h2>
            <form className='summary-prompt-form'>
                <div className='summary-prompt-form-halves'>
                    <div className='summary-prompt-form-half'>
                        <label htmlFor='start-date'>From</label>
                        <input id='start-date' type='date'></input>
                    </div>
                    <div className='summary-prompt-form-half'>
                        <div>
                            <label htmlFor='end-date'>To</label>
                            <input defaultChecked id='single-day-check' onChange={handleSingleDayCheckChange} type='checkbox'></input>
                            <label htmlFor='single-day-check'>Single day?</label>
                        </div>
                        <input id='end-date' type='date'></input>
                    </div>
                </div>
                <button type='button'>Search</button>
            </form>
        </>
    );
}

export default SummaryPrompt;