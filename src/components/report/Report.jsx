import React, { useEffect, useState } from 'react';
import './Report.css'
import ReportPrompt from './ReportPrompt';
import { Api } from '../../api';
import { useSearchParams } from 'react-router-dom';
import { render } from '@testing-library/react';

function Report(props) {

    const [searchParams, setSearchParams] = useSearchParams();

    const [date, setDate] = useState();

    const [status, setStatus] = useState('Loading');

    const [isCashDefault, setCashDefault] = useState();
    const [types, setTypes] = useState();
    const [denominations, setDenominations] = useState();

    const [csv, setCsv] = useState(null);

    useEffect(() => {
        setDate(searchParams.get("date"));
    }, [searchParams]);

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

    const handleDateChange = (date) => {
        setSearchParams({ 'date': date});
    }

    const beginSubmit = function() {
        setStatus('Submitting');
    }

    const finishSubmit = function() {
        setStatus('');
    }

    const renderPrompt = function() {
        return <ReportPrompt beginSubmit={beginSubmit} defaultDate={date ? date : new Date().toISOString().substring(0, 10)} finishSubmit={finishSubmit} handleDateChange={handleDateChange} isCashDefault={isCashDefault} transactionTypes={types} denominations={denominations}/>
    }

    const handleCsvChange = (e) => {
        setCsv(e.target.files[0]);
    }

    const uploadFile = async () => {
        if (csv == null) {
            alert("Please select a file to upload.");
            return;
        }
        beginSubmit();
        try {
            console.log(csv);
            await Api.uploadCsv(csv);
            finishSubmit();
        }
        catch(e) {
            alert(e);
            finishSubmit();
        }
        
    }

    const renderUploadLink = function() {
        return (
            <form className='report-upload-form bordered padded'>
                <h2>Upload by CSV</h2>
                <input className='report-input upload-input' id='csv-file' onChange={handleCsvChange} type='file'></input>
                <button className='report-submit-button upload-button' onClick={uploadFile} type='button'>Upload</button>
            </form>
        );
    }

    const render = function() {
        if (status !== '') {
            return(
                <div className='sub-section-wrapper'>
                    <h2>{status}</h2>
                </div>
            );
        }
        return(
            <>
                {renderPrompt()}
                {renderUploadLink()}
            </>
        );
    }
    
    return(
        <div className='section-wrapper'>
            <h1>Report</h1>
            {render()}
            {/* {renderPrompt()}
            {renderUploadLink()} */}
        </div>
    );
}

export default Report;