import React from 'react';
import ReportSummary from '../../summary/ReportSummary';
import './BrowseSummariesWrapper.css'

function BrowseSummariesWrapper(props) {
    return(
        <div className='browse-summaries-wrapper'>
            {props.reports.map(
                report =>
                <ReportSummary key={report.date} report={report} />
            )}
        </div>
    );
}

export default BrowseSummariesWrapper;