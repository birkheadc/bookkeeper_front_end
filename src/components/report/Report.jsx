import React, { useEffect, useState } from 'react';
import './Report.css'
import ReportPrompt from './ReportPrompt';
import { Api } from '../../api';

function Report(props) {

    const [status, setStatus] = useState('Loading');
    const [isCashDefault, setCashDefault] = useState();
    const [types, setTypes] = useState();
    const [denominations, setDenominations] = useState();

    useEffect(() => {
        const getData = async () => {
            setStatus('Loading');
            try {
                let isCashDefault = await Api.fetchSettings();
                setCashDefault(isCashDefault.isCashDefault);
                let types = await Api.fetchTransactionTypes();
                setTypes(types);
                let denominations = await Api.fetchDenominations();
                setDenominations(denominations);
                setStatus('');
            }
            catch(e) {
                setStatus(e);
            }
            
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