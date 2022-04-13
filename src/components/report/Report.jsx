import React, { useEffect, useState } from 'react';
import './Report.css'
import fetchSettings from '../../api/fetchSettings/FetchSettings';
import ReportPrompt from './ReportPrompt';
import CashWidget from './CashWidget';

function Report(props) {

    const [isCashDefault, setCashDefault] = useState();

    useEffect(() => {
        const fetch = async () => {
            let s = await fetchSettings(process.env.REACT_APP_BOOKKEEPER_URL);
            setCashDefault(s.isCashDefault);
        }
        fetch();
    }, []);
    
    return(
        <div>
            <h1>Report</h1>
            <ReportPrompt isCashDefault={isCashDefault} />
        </div>
    );
}

export default Report;