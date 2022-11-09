import React from 'react';
import { Utils } from '../../../helpers';
import ReportSummary from '../../summary/ReportSummary';
import BrowseSummariesWeek from './BrowseSummariesWeek';
import './BrowseSummariesWrapper.css'

function BrowseSummariesWrapper(props) {

    function getBlankDay() {
        return {
            date: Utils.getNewUUID(),
            isBlankDay: true
        };
    }

    function calculateStartNumBlankDays(month) {
        const date = new Date(month[0].date);
        return date.getDay();
    }

    function calculateEndNumBlankDays(month) {
        const date = new Date(month[month.length - 1].date);
        return 6 - date.getDay();
    }

    function getWeeksFromMonth(month) {

        const startNumBlankDays = calculateStartNumBlankDays(month);
        const endNumBlankDays = calculateEndNumBlankDays(month);

        const days = [];

        for (let i = 0; i < startNumBlankDays; i++) {
            days.push(getBlankDay());
        }

        for (let i = 0; i < month.length; i++) {
            days.push(month[i]);
        }

        for (let i = 0; i < endNumBlankDays; i++) {
            days.push(getBlankDay());
        }

        const weeks = [];

        while (days.length > 0) {
            weeks.push({
                key: Utils.getNewUUID(),
                days: days.splice(0, 7)
            });
        }

        return weeks;
    }

    if (props.mode === 'month') {

        return (
            getWeeksFromMonth(props.reports).map(
                week =>
                <BrowseSummariesWeek key={week.key} reports={week.days}/>
            )
        );
    }

    return(
        <BrowseSummariesWeek reports={props.reports}/>
    );
}

export default BrowseSummariesWrapper;