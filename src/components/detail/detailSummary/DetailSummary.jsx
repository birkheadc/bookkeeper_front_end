import React from "react";
import './DetailSummary.css';
import { LocaleConversions, TransactionCategoryHelpers } from "../../../helpers";


export default function DetailSummary(props) {
  console.log(props);
  return (
    <div className='browse-span-summary-wrapper'>
      <hr></hr>
      <div>
          <h3>Total Gross</h3><h3>{LocaleConversions.formatNumber(props.report.summary.gross)}</h3>
      </div>
      <div>
          <h3>Average Gross</h3>
      </div>
      <div>
        <h4>Day</h4><h4>{LocaleConversions.formatNumber(props.report.summary.aveGross)}</h4>
      </div>
      <div>
        <h4>Month</h4><h4>{LocaleConversions.formatNumber(props.report.summary.aveGross * 365 / 12)}</h4>
      </div>
      <div>
        <h4>Year</h4><h4>{LocaleConversions.formatNumber(props.report.summary.aveGross * 365)}</h4>
      </div>
      <hr></hr>
      <div>
          <h3>Total Net</h3><h3>{LocaleConversions.formatNumber(props.report.summary.net)}</h3>
      </div>
      <div>
          <h3>Average Net</h3>
      </div>
      <div>
        <h4>Day</h4><h4>{LocaleConversions.formatNumber(props.report.summary.aveNet)}</h4>
      </div>
      <div>
        <h4>Month</h4><h4>{LocaleConversions.formatNumber(props.report.summary.aveNet * 365 / 12)}</h4>
      </div>
      <div>
        <h4>Year</h4><h4>{LocaleConversions.formatNumber(props.report.summary.aveNet * 365)}</h4>
      </div>
      <hr></hr>
      <table className='span-summary-table'>
          <thead>
              <tr className='border-bottom'>
                  <th className='left-align'>Category</th>
                  <th className='right-align'>Total</th>
                  <th className='right-align'>Average</th>
              </tr>
          </thead>
          <tbody>
              {props.report.summary.breakdowns.map(
                  breakdown =>
                  <tr key={breakdown.category}>
                      <td className='left-align'>{TransactionCategoryHelpers.convertTransactionTypeName(breakdown.category)}</td>
                      <td className='right-align'>{LocaleConversions.formatNumber(breakdown.total)}</td>
                      <td className='right-align'>{LocaleConversions.formatNumber(breakdown.average)}</td>
                  </tr>
              )}
          </tbody>
      </table>
  </div>
  );
}