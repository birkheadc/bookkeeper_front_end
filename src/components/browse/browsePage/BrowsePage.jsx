import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import './BrowsePage.css'
import BrowseControls from '../browseControls/BrowseControls';
import { Utils } from '../../../helpers';
import { Api } from '../../../api';
import BrowseSummariesWrapper from '../browseSummariesWrapper/BrowseSummariesWrapper';
import BrowseSpanSummary from '../browseSpanSummary/BrowseSpanSummary';

function BrowsePage(props) {

    const [searchParams, setSearchParams] = useSearchParams();
    const [status, setStatus] = useState('initial');
    const [date, setDate] = useState();
    const [mode, setMode] = useState();
    const [report, setReport] = useState();

    useEffect(() => {
        const modes = ['day', 'week', 'month'];
        let doesRequireReload = false;
        let date;
        let mode;
        if ((searchParams.has('date') === true)) {
            date = new Date(Date.parse(searchParams.get("date")));
        }
        
        if ((date == null) || (isNaN(date) === true)) {
            date = new Date();
            doesRequireReload = true;
        }

        if (searchParams.has('mode') === true) {
            mode = searchParams.get('mode');
        }

        if ((mode == null) || (modes.includes(mode) === false)) {
            mode = 'day';
            doesRequireReload = true;
        }

        if (doesRequireReload === true) {
            let newSearchParams = {
                date: date.toISOString().slice(0, 10),
                mode: 'day'
            }
            setSearchParams(newSearchParams);
        }
        else {
            setDate(date);
            setMode(mode);
        }
        
    }, [searchParams, setSearchParams]);

    useEffect(() => {

        async function loadAndSetReports() {
            setStatus('loading');
            const dates = Utils.getDatesByDateAndMode(date, mode);
            // Todo
            const report = await Api.fetchReports(dates[0], dates[dates.length - 1]);
            setReport(report);
            setStatus('');
        }

        if ((date != null) && (mode != null)) {
            loadAndSetReports();
        }

    }, [date, mode]);

    const handleDateChange = (date) => {
        setSearchParams({
            date: date,
            mode: searchParams.get('mode')
        });
    }

    const handleModeChange = (mode) => {
        setSearchParams({
            date: searchParams.get('date'),
            mode: mode
        });
    }

    function renderControls() {
        if ((date == null) || (mode == null)) {
            return null;
        }
        return (
            <BrowseControls date={searchParams.get('date')} handleDateChange={handleDateChange} handleModeChange={handleModeChange} mode={searchParams.get('mode')} />
        );
    }

    function renderDayOfWeekLabels() {

        if ((mode !== 'week') && (mode !== 'month')) {
            return null;
        }

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        return (
            <div className='browse-summaries-wrapper'>
            {days.map(
                day =>
                <div className='report-summary-wrapper day-of-week-label' key={day}>
                    <h2>{day}</h2>
                </div>  
            )}
            </div>
        );
    }

    function renderSummaries() {
        if (report == null || status !== '') {
            return (
                <h2>{status}</h2>
            );
        }
        
        return (
            <>
                <BrowseSpanSummary summary={report.summary} />
                {renderDayOfWeekLabels()}
                <BrowseSummariesWrapper mode={mode} reports={report.reports} />
            </>
        );
    }

    return(
        <div className='section-wrapper'>
            <h1>Browse</h1>
            <div className='browse-sub-section-wrapper'>
                {renderControls()}
                {renderSummaries()}
            </div>
        </div>
    );
}

export default BrowsePage;