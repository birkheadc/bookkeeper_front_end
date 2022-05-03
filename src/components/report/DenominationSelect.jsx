import React from 'react';
import './DenominationSelect.css'

function DenominationSelect(props) {

    const handleSelect = (e) => {

        // Only do things if selected option is not default
        if (e.target.value !== '$') {
            if (e.target.value === '$create-new') {
                props.promptNewDenomination();
            }
            else {
                props.handleAddDenomination(e.target.value);
            }
            
        }

        // Return select to default option
        e.target.value = '$'
    }

    const renderOptions = function() {
        if (props.denominations == null) {
            return null;
        }
        return(
            props.denominations.map(
                denomination =>
                <option key={denomination.value} value={denomination.value}>{denomination.value}</option>
            )
        );
    }

    return(
        <select className='denomination-select report-input' onChange={handleSelect}>
            <option value='$'>( Add Another )</option>
            {renderOptions()}
            <option value='$create-new'>( Create New )</option>
        </select>
    );
}

export default DenominationSelect;