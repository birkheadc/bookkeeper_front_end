import React from "react";
import './DetailChartControls.css';

export default function DetailChartControls(props) {

  const handleChangeMode = (e) => {
    const mode = e.target.getAttribute('data-mode');
    props.handleChangeMode(mode);
  }

  return (
    <div className='browse-controls-mode-buttons'>
        <button className={'browse-controls-button' + (props.mode ==='day' ? ' browse-controls-button-active' : '')} data-mode='day' onClick={handleChangeMode} type='button'>Day</button>
        <button className={'browse-controls-button' + (props.mode ==='week' ? ' browse-controls-button-active' : '')} data-mode='week' onClick={handleChangeMode} type='button'>Week</button>
        <button className={'browse-controls-button' + (props.mode ==='month' ? ' browse-controls-button-active' : '')} data-mode='month' onClick={handleChangeMode} type='button'>Month</button>
    </div>
  );
}