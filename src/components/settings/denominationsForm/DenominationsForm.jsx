import React from 'react';
import './DenominationsForm.css'
import DenominationsFormRow from './DenominationsFormRow';

function DenominationsForm(props) {

    const handleAddDenomination = () => {

    }

    return(
        <div className='settings-sub-section-wrapper'>
            <h2>Calculator Denominations</h2>
            <hr></hr>
            <form>
                {props.settings.denominations.map(
                    denomination =>
                    <DenominationsFormRow denomination={denomination} key={denomination.value} />
                )}
            </form>
            <button onClick={handleAddDenomination} type='button'>+</button>
        </div>
    );
}

export default DenominationsForm;