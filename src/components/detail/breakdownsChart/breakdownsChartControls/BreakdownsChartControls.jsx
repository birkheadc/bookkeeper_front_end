import React from 'react';
import './BreakdownsChartControls.css';

export default function BreakdownsChartControls(props) {
  const handleChangeMode = (e) => {
    const mode = e.target.getAttribute('data-mode');
    props.handleChangeMode(mode);
  }

  return (
    <div className='browse-controls-mode-buttons'>
        <button className={'browse-controls-button' + (props.mode ==='dayOfWeek' ? ' browse-controls-button-active' : '')} data-mode='dayOfWeek' onClick={handleChangeMode} type='button'>Day of Week</button>
        <button className={'browse-controls-button' + (props.mode ==='dayOfMonth' ? ' browse-controls-button-active' : '')} data-mode='dayOfMonth' onClick={handleChangeMode} type='button'>Day of Month</button>
        <button className={'browse-controls-button' + (props.mode ==='month' ? ' browse-controls-button-active' : '')} data-mode='month' onClick={handleChangeMode} type='button'>Month</button>
    </div>
  );
}