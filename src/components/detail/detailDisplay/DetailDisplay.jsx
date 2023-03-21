import React from 'react';
import BreakdownsChart from '../breakdownsChart/BreakdownsChart';
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
      <DetailChart report={props.report}/>
      <DetailSummary report={props.report} />
      <BreakdownsChart breakdowns={props.breakdowns}/>
    </div>
  );
}

export default DetailDisplay;