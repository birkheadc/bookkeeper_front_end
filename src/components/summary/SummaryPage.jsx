import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './SummaryPage.css'
import fetchSummary from '../../api/fetchSummary/FetchSummary';
import Summary from './Summary';
import SummaryPrompt from './SummaryPrompt';

function SummaryPage(props) {

    const [searchParams, setSearchParams] = useSearchParams();

    // Dates are stored as seconds since epoch
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();

    // Summary is fetched from api. Expected form:
    // {
    //     "StartDate": "yyyy-MM-dd",
    //     "EndDate": "yyyy-MM-dd",
    //     "Gross": 999999,
    //     "Net": 999999,
    //     "PositiveTransactions": [
    //         {
    //             "Id": 000-000-000-000,
    //             "Date": "yyyy-MM-dd",
    //             "Type": "typeoftransaction",
    //             "Amount": 999,
    //             "Note": "note about transaction"
    //         },
    //         {
    //             "Id": 000-000-000-000,
    //             "Date": "yyyy-MM-dd",
    //             "Type": "typeoftransaction",
    //             "Amount": 999,
    //             "Note": "note about transaction"
    //         }
    //     ],
    //     "NegativeTransactions": [
    //         {
    //             "Id": 000-000-000-000,
    //             "Date": "yyyy-MM-dd",
    //             "Type": "typeoftransaction",
    //             "Amount": -999,
    //             "Note": "note about transaction"
    //         },
    //         {
    //             "Id": 000-000-000-000,
    //             "Date": "yyyy-MM-dd",
    //             "Type": "typeoftransaction",
    //             "Amount": -999,
    //             "Note": "note about transaction"
    //         }
    //     ],
    // }
    const [summary, setSummary] = useState();
    
    const [message, setMessage] = useState();

    // Runs when search parameters change
    useEffect(() => {
        setStartDate(Date.parse(searchParams.get("startDate")));
        setEndDate(Date.parse(searchParams.get("endDate")));
    }, [searchParams]);

    // Runs when start and/or end date change
    useEffect(() => {

        if (startDate === null || endDate === null || isNaN(startDate) || isNaN(endDate)) {
            return;
        }

        const getSummary = async () => {
            const summary = await fetchSummary(props.apiUrl, startDate, endDate);
            setSummary(summary);
        }

        getSummary();
    }, [startDate, endDate, props.apiUrl]);

    const displaySummary = function() {
        if (summary === undefined || summary === null) {
            return(
                <SummaryPrompt />
            );
        }
        return(
            <Summary summary={summary}/>
        );
    }

    return(
        <div>
            <h1>Summary</h1>
            {displaySummary()}
        </div>
    );
}

export default SummaryPage;