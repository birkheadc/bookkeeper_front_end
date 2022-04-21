import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './SummaryPrompt.css'

function SummaryPrompt(props) {

    const navigate = useNavigate();

    const startDateInput = document.getElementById('start-date');
    const endDateInput = document.getElementById('end-date');
    const isSingleDayCheck = document.getElementById('single-day-check');

    const handleSingleDayCheckChange = (e) => {

        let isSingleDay = e.target.checked;
        
        if (isSingleDay === true) {
            endDateInput.value = startDateInput.value;
        }

        endDateInput.disabled = isSingleDay;
    }

    const handleStartDateChange = () => {
        let isSingleDay = isSingleDayCheck.checked;

        if (isSingleDay === true) {
            endDateInput.value = startDateInput.value;
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        let startDate = startDateInput.value;
        let endDate = endDateInput.value;

        navigate("/summary?startDate=" + startDate + "&endDate=" + endDate);
    }

    return(
        <div>
            <h2>Search</h2>
            <form className='summary-prompt-form' onSubmit={handleSearch}>
                <div className='summary-prompt-form-halves'>
                    <div className='summary-prompt-form-half'>
                        <label htmlFor='start-date'>From</label>
                        <input id='start-date' onChange={handleStartDateChange} type='date'></input>
                    </div>
                    <div className='summary-prompt-form-half'>
                        <div>
                            <label htmlFor='end-date'>To</label>
                            <input defaultChecked id='single-day-check' onChange={handleSingleDayCheckChange} type='checkbox'></input>
                            <label htmlFor='single-day-check'>Single day?</label>
                        </div>
                        <input disabled id='end-date' type='date'></input>
                    </div>
                </div>
                <button type='submit'>Search</button>
            </form>
        </div>
    );
}

export default SummaryPrompt;