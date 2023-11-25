import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './BrowsePage.css';
import BrowseControls from '../browseControls/BrowseControls';
import { Utils } from '../../../helpers';
import { Api } from '../../../api';
import BrowseSummariesWrapper from '../browseSummariesWrapper/BrowseSummariesWrapper';
import BrowseSpanSummary from '../browseSpanSummary/BrowseSpanSummary';
import { UserSettings } from '../../../helpers/settings';

function BrowsePage(props) {

    const [searchParams, setSearchParams] = useSearchParams();
    const [status, setStatus] = useState('initial');
    const [date, setDate] = useState();
    const [mode, setMode] = useState();
    const [report, setReport] = useState();

    const nav = useNavigate();

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
            mode = UserSettings.retrieveUserSettingByName('defaultBrowseMode');
            if (modes.includes(mode) === false) {
                mode = 'day';
            }
            doesRequireReload = true;
        }

        if (doesRequireReload === true) {
            let newSearchParams = {
                date: date.toISOString().slice(0, 10),
                mode: mode
            }
            nav(`?date=${newSearchParams.date}&mode=${newSearchParams.mode}`);
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

    const handleDateBack = () => {
      const newDate = new Date(searchParams.get('date'));
      const mode = searchParams.get('mode');
      if (mode === 'day') {
        newDate.setDate(newDate.getDate() - 1);
      }
      else if (mode === 'week') {
        newDate.setDate(newDate.getDate() - 7);
      }
      else if (mode === 'month') {
        newDate.setMonth(newDate.getMonth() - 1);
      }
      handleDateChange(newDate.toISOString().slice(0, 10));
    }

    const handleDateForward = () => {
      const newDate = new Date(searchParams.get('date'));
      const mode = searchParams.get('mode');
      if (mode === 'day') {
        newDate.setDate(newDate.getDate() + 1);
      }
      else if (mode === 'week') {
        newDate.setDate(newDate.getDate() + 7);
      }
      else if (mode === 'month') {
        newDate.setMonth(newDate.getMonth() + 1);
      }
      handleDateChange(newDate.toISOString().slice(0, 10));
    }

    function renderControls() {
        if ((date == null) || (mode == null)) {
            return null;
        }
        return (
            <BrowseControls date={searchParams.get('date')} handleDateChange={handleDateChange} handleModeChange={handleModeChange} handleDateBack={handleDateBack} handleDateForward={handleDateForward} mode={searchParams.get('mode')} />
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
                <div className='browse-summary-wrapper'>
                    {renderDayOfWeekLabels()}
                    <BrowseSummariesWrapper mode={mode} reports={report.reports} />
                </div>
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