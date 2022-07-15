import React from 'react';
import './Upload.css'
import { Api } from '../../api';
import { useState } from 'react';
import { useEffect } from 'react';

function Upload(props) {

    const [csv, setCsv] = useState();
    const [message, setMessage] = useState('Select a file');

    const handleCsvChange = (e) => {
        setCsv(e.target.files[0]);
    }

    const uploadFile = async () => {
        if (csv == null) {
            return;
        }
        setMessage('Submitting...');
        try {
            await Api.uploadCsv(csv);
            setMessage('Uploaded successfully');
        }
        catch(e) {
            setMessage('Failed to upload');
        }
    }

    function renderUploadLink() {
        return (
            <form className='report-upload-form bordered padded'>
                <h2 className='warning-text'>Warning!</h2>
                <p className='centered warning-text large'>This will replace the entire database, deleting all current information!</p>
                <h2>{message}</h2>
                <div>
                    <input id='csv-file' onChange={handleCsvChange} type='file'></input>
                    <button onClick={uploadFile} type='button'>Upload</button>
                </div>
            </form>
        );
    }

    return(
        <div className='section-wrapper'>
            <h1>Upload</h1>
            {renderUploadLink()}
        </div>
    );
}

export default Upload;