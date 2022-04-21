import React, { useEffect, useState } from 'react';
import './Report.css'
import fetchSettings from '../../api/fetchSettings/FetchSettings';
import ReportPrompt from './ReportPrompt';
import fetchTransactionTypes from '../../api/fetchTransactionTypes/FetchTransactionTypes';
import fetchDenominations from '../../api/fetchDenominations/FetchDenominations';

function Report(props) {

    const [status, setStatus] = useState('Loading');
    const [isCashDefault, setCashDefault] = useState();
    const [types, setTypes] = useState();
    const [denominations, setDenominations] = useState();

    useEffect(() => {
        const getData = async () => {
            setStatus('Loading');
            let isCashDefault = await fetchSettings();
            setCashDefault(isCashDefault.isCashDefault);
            let types = await fetchTransactionTypes();
            setTypes(types);
            let denominations = await fetchDenominations();
            setDenominations(denominations);
            setStatus('');
        }
        getData();
    }, []);

    const beginSubmit = function() {
        setStatus('Submitting');
    }

    const finishSubmit = function() {
        setStatus('');
    }

    const renderPrompt = function() {

        if (status !== '') {
            return(
                <h2>{status}</h2>
            );
        }
        return <ReportPrompt beginSubmit={beginSubmit} finishSubmit={finishSubmit} isCashDefault={isCashDefault} transactionTypes={types} denominations={denominations}/>
    }
    
    return(
        <div>
            <h1>Report</h1>
            {renderPrompt()}
        </div>
    );
}

export default Report;