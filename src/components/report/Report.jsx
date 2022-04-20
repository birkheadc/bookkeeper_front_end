import React, { useEffect, useState } from 'react';
import './Report.css'
import fetchSettings from '../../api/fetchSettings/FetchSettings';
import ReportPrompt from './ReportPrompt';
import fetchTransactionTypes from '../../api/fetchTransactionTypes/FetchTransactionTypes';
import fetchDenominations from '../../api/fetchDenominations/FetchDenominations';

function Report(props) {

    const [isLoading, setLoading] = useState();
    const [isCashDefault, setCashDefault] = useState();
    const [types, setTypes] = useState();
    const [denominations, setDenominations] = useState();

    useEffect(() => {
        const fetch = async () => {
            let isCashDefault = await fetchSettings();
            setCashDefault(isCashDefault.isCashDefault);
            let types = await fetchTransactionTypes();
            setTypes(types);
            let denominations = await fetchDenominations();
            setDenominations(denominations);
            setLoading(false);
        }
        setLoading(true);
        fetch();
    }, []);

    const renderPrompt = function() {

        if (isLoading === undefined || isLoading === true) {
            return(
                <h2>Loading...</h2>
            );
        }
        return <ReportPrompt isCashDefault={isCashDefault} transactionTypes={types} denominations={denominations}/>
    }
    
    return(
        <div>
            <h1>Report</h1>
            {renderPrompt()}
        </div>
    );
}

export default Report;