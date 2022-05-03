import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LocaleConversions, Utils } from '../../helpers';
import './DaySummary.css'

function DaySummary(props) {

    const navigate = useNavigate();

    const handleCreateReportButton = () => {
        const path = "/report?date=" + props.summary.startDate.toString().substring(0, 10);
        navigate(path);
    }

    const displayCreateReportButton = function() {
        if (props.summary.gross === 0 && props.summary.net === 0) {
            return (
                <button onClick={handleCreateReportButton} type='button'>Create</button>
            );
        }
    }

    return(
        <tr>
            <td>{LocaleConversions.getDayOfWeekFromDate(props.summary.startDate)} {LocaleConversions.getDateStringFromDate(props.summary.startDate)}</td>  
            <td>{props.summary.gross}</td>
            <td>{props.summary.net}</td>
            <td>{displayCreateReportButton()}</td>
        </tr>
    );
}

export default DaySummary;