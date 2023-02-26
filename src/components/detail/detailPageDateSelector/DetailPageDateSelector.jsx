import React, { useEffect, useState } from 'react';
import './DetailPageDateSelector.css';

function DetailPageDateSelector(props) {

  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);

  const [from, setFrom] = useState(oneMonthAgo.toISOString().slice(0, 10));
  const [to, setTo] = useState(today.toISOString().slice(0, 10));

  const handleFromDateChange = (ev) => {
    setFrom(ev.target.value);
  }

  const handleToDateChange = (ev) => {
    setTo(ev.target.value);
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (from <= to) props.handleChangeDates(from, to);
  }

  return (
    <form className='details-control-form' onSubmit={handleSubmit}>
      <div className='details-control-form-row'>
        <label htmlFor='from-date-input'>From</label>
        <input id='from-date-input' type='date' onChange={handleFromDateChange} value={from}></input>
      </div>
      <div className='details-control-form-row'>
        <label htmlFor='to-date-input'>To</label>
        <input id='to-date-input' type='date' onChange={handleToDateChange} value={to}></input>
      </div>
      <div className='details-control-form-row'>
        <button type='submit'>Go</button>
      </div>
    </form>
  );
}

export default DetailPageDateSelector;