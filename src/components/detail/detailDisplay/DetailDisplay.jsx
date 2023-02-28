import React from 'react';
import DetailChart from '../detailChart/DetailChart';
import DetailSummary from '../detailSummary/DetailSummary';
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
      <DetailChart report={props.report} />
      <DetailSummary report={props.report} />
    </div>
  );
}

export default DetailDisplay;