import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SummaryPrompt.css'

function SummaryPrompt(props) {

    const navigate = useNavigate();

    const handleSingleDayCheckChange = (e) => {
        let startDate = document.getElementById('start-date');
        let endDate = document.getElementById('end-date');

        let isSingleDay = e.target.checked;
        
        if (isSingleDay === true) {
            endDate.value = startDate.value;
        }

        endDate.disabled = isSingleDay;
    }

    const handleStartDateChange = () => {
        let startDate = document.getElementById('start-date');
        let endDate = document.getElementById('end-date');
        let isSingleDay = document.getElementById('single-day-check').checked;

        if (isSingleDay === true) {
            endDate.value = startDate.value;
        }
    }

    const handleSearch = () => {
        let startDate = document.getElementById('start-date').value;
        let endDate = document.getElementById('end-date').value;

        navigate("/summary?startDate=" + startDate + "&endDate=" + endDate);
    }

    return(
        <>
            <h2>Select date(s)</h2>
            <form className='summary-prompt-form'>
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
                <button onClick={handleSearch} type='button'>Search</button>
            </form>
        </>
    );
}

export default SummaryPrompt;