import React, { useEffect, useState } from 'react';
import CashWidget from './CashWidget';
import './ReportPrompt.css'

function ReportPrompt(props) {

    const [isCashDisplay, setCashDisplay] = useState();

    useEffect(() => {
        setCashDisplay(props.isCashDefault ? props.isCashDefault : false);
    }, [props.isCashDefault]);

    const displayCashWidget = function() {
        if (isCashDisplay === undefined || isCashDisplay === null || isCashDisplay === false || isCashDisplay === 'false') {
            return null;
        }
        return <CashWidget />
    }

    return(
        <form>
            <h2>Form</h2>
            {displayCashWidget()}
        </form>
    );
}

export default ReportPrompt;