import React from 'react';
import './Report.css'
import fetchSettings from '../../api/fetchSettings/FetchSettings';

function Report(props) {

    const test = async () => {
        let s = await fetchSettings(process.env.REACT_APP_BOOKKEEPER_URL);
        console.log(s);
    }

    test();
    
    return(
        <div>
            <h1>Report</h1>
        </div>
    );
}

export default Report;