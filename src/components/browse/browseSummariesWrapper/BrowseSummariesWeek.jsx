import React from 'react';
import ReportSummary from '../../summary/ReportSummary';

function BrowseSummariesWeek(props) {

    if (props.reports == null) {
        return null;
    }

    return(
        <div className='browse-summaries-wrapper'>
            {props.reports.map(
                report =>
                <ReportSummary addEditButton={true} key={report.date} report={report} />
            )}
        </div>
    );
}

export default BrowseSummariesWeek;