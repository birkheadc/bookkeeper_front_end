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
            let isCashDefault = await fetchSettings(process.env.REACT_APP_BOOKKEEPER_URL);
            setCashDefault(isCashDefault.isCashDefault);
            let types = await fetchTransactionTypes(process.env.REACT_APP_BOOKKEEPER_URL);
            setTypes(types);
            let denominations = await fetchDenominations(process.env.REACT_APP_BOOKKEEPER_URL);
            setDenominations(denominations);
            setLoading(false);
        }
        setLoading(true);
        fetch();
    }, []);

    const renderPrompt = function() {
        console.log("----------------------------------------");
        console.log("IsLoading: " + isLoading);
        console.log("isCashDefault: " + isCashDefault);
        console.log("types: " + types);
        console.log("denominations: " + denominations);
        console.log("----------------------------------------");

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