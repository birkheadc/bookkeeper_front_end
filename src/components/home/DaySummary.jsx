import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LocaleConversions, Utils } from '../../helpers';
import './DaySummary.css'

import createReportIcon from '../../media/images/icons/plus_icon.png';


function DaySummary(props) {

    const navigate = useNavigate();

    const handleCreateReportButton = () => {
        const path = "/report?date=" + props.summary.startDate.toString().substring(0, 10);
        navigate(path);
    }

    const getCreateButtonContents = function() {
        if (props.width < parseInt(process.env.REACT_APP_MOBILE_WIDTH)) {
            return '+';
        }
        return 'Create';
    }

    const displayCreateReportButton = function() {
        if (props.summary.gross === 0 && props.summary.net === 0) {
            return (
                <button className='home-create-button' onClick={handleCreateReportButton} type='button'>{getCreateButtonContents()}</button>
            );
        }
    }

    const getDate = function() {
        if (props.width < 500) {
            return LocaleConversions.getDateStringFromDate(props.summary.startDate);
        }
        return LocaleConversions.getDayOfWeekFromDate(props.summary.startDate) + ' ' + LocaleConversions.getDateStringFromDate(props.summary.startDate);
    }

    return(
        <tr>
            <td className='home-summary-table-date'>{getDate()}</td>  
            <td className='home-summary-table-gross'>{LocaleConversions.formatNumber(props.summary.gross)}</td>
            <td className='home-summary-table-net'>{LocaleConversions.formatNumber(props.summary.net)}</td>
            <td className='home-summary-table-button'>{displayCreateReportButton()}</td>
        </tr>
    );
}

export default DaySummary;