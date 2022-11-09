import React from 'react';  
import { LocaleConversions } from '../../helpers';
import { TransactionCategoryHelpers } from '../../helpers';

function ReportSummaryTableRowEarning(props) {

    function renderEarningAmount(earning) {
        if (isNaN(earning.amount) === true) {
            return 0;
        }
        return LocaleConversions.formatNumber(earning.amount);
    }

    if (props.earning.amount <= 0) {
        return null;
    }

    return(
        <tr>
            <td className='left-align'><span className='overflow'><span>{TransactionCategoryHelpers.convertTransactionTypeName(props.earning.category)}</span></span></td>
            <td className='right-align'>{renderEarningAmount(props.earning)}</td>
        </tr>
    );
}

export default ReportSummaryTableRowEarning;