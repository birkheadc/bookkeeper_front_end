import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './BrowseSpanSummary.css'
import { LocaleConversions, TransactionCategoryHelpers } from '../../../helpers';

function BrowseSpanSummary(props) {

    return(
        <div className='browse-span-summary-wrapper'>
            <div>
                <h3>Total</h3><h3>{LocaleConversions.formatNumber(props.summary.gross)}</h3>
            </div>
            <div>
                <h3>Average</h3><h3>{LocaleConversions.formatNumber(props.summary.aveGross)}</h3>
            </div>
            <table className='span-summary-table'>
                <thead>
                    <tr className='border-bottom'>
                        <th className='left-align'>Category</th>
                        <th className='right-align'>Total</th>
                        <th className='right-align'>Average</th>
                    </tr>
                </thead>
                <tbody>
                    {props.summary.breakdowns.map(
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

export default BrowseSpanSummary;