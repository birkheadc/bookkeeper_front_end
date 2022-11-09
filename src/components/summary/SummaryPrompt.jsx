import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SummaryPrompt.css'

function SummaryPrompt(props) {

    const navigate = useNavigate();

    const handleSingleDayCheckChange = (e) => {

        let isSingleDay = e.target.checked;
        
        if (isSingleDay === true) {
            document.getElementById('end-date').value = document.getElementById('start-date').value;
            document.getElementById('summary-end-date-row').classList.add('hide-me');
        }
        else {
            document.getElementById('summary-end-date-row').classList.remove('hide-me');
        }
        document.getElementById('end-date').disabled = isSingleDay;
    }

    const handleStartDateChange = () => {
        let isSingleDay = document.getElementById('single-day-check').checked;

        if (isSingleDay === true) {
            document.getElementById('end-date').value = document.getElementById('start-date').value;
        }
    }

    const handleSearch = (e) => {
        e.preventDefault();
        let startDate = document.getElementById('start-date').value;
        let endDate = document.getElementById('end-date').value;

        navigate("/summary?startDate=" + startDate + "&endDate=" + endDate);
    }

    return(
        <div className='summary-prompt-wrapper bordered margined padded'>
            <h2>Search</h2>
            <form className='summary-prompt-form' onSubmit={handleSearch}>
                <div className='summary-prompt-form-row'>
                    <label className='summary-prompt-form-label' htmlFor='start-date'>From</label>
                    <input className='report-input' id='start-date' onChange={handleStartDateChange} type='date'></input>
                </div>
                <div className='summary-prompt-form-row'>
                    <label htmlFor='single-day-check'>Single day?</label>
                    <input defaultChecked id='single-day-check' onChange={handleSingleDayCheckChange} type='checkbox'></input>
                </div>
                <div className='summary-prompt-form-row hide-me' id='summary-end-date-row'>
                    <label className='summary-prompt-form-label' htmlFor='end-date'>To</label>
                    <input className='report-input' disabled id='end-date' type='date'></input>
                </div>
                <button className='summary-prompt-button' type='submit'>Search</button>
            </form>
        </div>
    );
}

export default SummaryPrompt;