import React from 'react';
import DaySummary from './DaySummary';
import './HomeSummary.css'

function HomeSummary(props) {

    const displayTotals = function() {
        let gross = 0;
        let net = 0;
        let numActiveDays = 0;
        let averageGross = 0;
        let averageNet = 0;

        for (let i = 0; i < props.summaries.length; i++) {
            if (props.summaries[i].gross !== 0 && props.summaries[i].net !== 0) {
                gross += props.summaries[i].gross;
                net += props.summaries[i].net;
                numActiveDays++;
            }
        }

        averageGross = gross / numActiveDays;
        averageNet = net / numActiveDays;

        return (
            <div className='home-summary-totals'>
                <div>
                    <h3>Gross <span className='text-color'>{gross}</span></h3>
                    <h3>Average <span className='text-color'>{averageGross}</span></h3>
                </div>
                <div>
                    <h3>Net <span className='text-color'>{net}</span></h3>
                    <h3>Average <span className='text-color'>{averageNet}</span></h3>
                </div>
            </div>
        );
    }

    const displayIndividualDays = function() {
        return (
            <div className='home-summary-summaries-container'>
                <table className='home-summary-table'>
                    <thead>
                        <tr>
                            <th>Date</th><th>Gross</th><th>Net</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.summaries.map(
                            summary =>
                            <DaySummary key={summary.startDate} summary={summary} width={props.width} />
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
    
    return(
        <div>
            <h1>Past {props.numDays} Days</h1>
            {displayTotals()}
            {displayIndividualDays()}
        </div>
    );
}

export default HomeSummary;