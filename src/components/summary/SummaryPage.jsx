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

        setSummary(null);

        if (searchParams.get("startDate") === null || searchParams.get("endDate") === null) {
            setMessage("Please select date(s) to search.");
            return;
        }

        if (isNaN(startDate) || isNaN(endDate)) {
            setMessage("Bad format.");
            return;
        }

        if (endDate < startDate) {
            setMessage("Start date must be before or the same as end date.");
            return;
        }

        const getSummary = async () => {
            const summary = await fetchSummary(props.apiUrl, startDate, endDate);
            if (summary === null) {
                setMessage("Error connecting to server.");
                return;
            }
            setMessage("Please select date(s) to search.");
            setSummary(summary);
        }

        getSummary();
    }, [startDate, endDate, props.apiUrl]);

    const displaySummary = function() {
        if (summary !== undefined && summary !== null) {
            return(
                <Summary summary={summary}/>
            );
        }
    }

    return(
        <div>
            <h1>Summary</h1>
            {displaySummary()}
            <SummaryPrompt message={message}/>
        </div>
    );
}

export default SummaryPage;