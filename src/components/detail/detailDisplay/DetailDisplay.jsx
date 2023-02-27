import React from 'react';
import './DetailDisplay.css';

function DetailDisplay(props) {
  if (props.report == null) {
    return (
      <div className='detail-display-wrapper'>

      </div>
    );
  }
  return (
    <div className='detail-display-wrapper'>
      <h2>Display</h2>
      {props.report.summary.aveGross}
      
    </div>
  );
}

export default DetailDisplay;