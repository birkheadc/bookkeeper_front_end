import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './BrowseSpanSummary.css'
import { LocaleConversions } from '../../../helpers';

function BrowseSpanSummary(props) {

    return(
        <div>
            <h3>{'Total: ' + LocaleConversions.formatNumber(props.summary.gross)}</h3>
            <h3>{'Average: ' + LocaleConversions.formatNumber(props.summary.aveGross)}</h3>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Total</th>
                        <th>Average</th>
                    </tr>
                </thead>
                <tbody>
                    {props.summary.breakdowns.map(
                        breakdown =>
                        <tr key={breakdown.category}>
                            <td>{breakdown.category}</td>
                            <td>{LocaleConversions.formatNumber(breakdown.total)}</td>
                            <td>{LocaleConversions.formatNumber(breakdown.average)}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default BrowseSpanSummary;