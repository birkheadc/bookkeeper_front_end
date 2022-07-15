import React from 'react';
import './DenominationsForm.css'
import DenominationsFormRow from './DenominationsFormRow';

function DenominationsForm(props) {

    const handleAddDenomination = () => {
        props.handleAddDenomination();
    }

    const handleChangeIsDefault = (value, isDefault) => {
        props.handleChangeIsDefault(value, isDefault);
    }

    const handleDeleteDenomination = (value) => {
        props.handleDeleteDenomination(value);
    }

    return(
        <div className='settings-sub-section-wrapper'>
            <h2>Calculator Denominations</h2>
            <hr></hr>
            <form className='categories-form'>
                <div className='categories-form-sub-section'>
                    <h3>Denominations</h3>
                    {props.settings.denominations.map(
                        denomination =>
                        <DenominationsFormRow denomination={denomination} handleChangeIsDefault={handleChangeIsDefault} handleDeleteDenomination={handleDeleteDenomination} key={denomination.value} />
                    )}
                    <div className='settings-button-wrapper'>
                        <button onClick={handleAddDenomination} type='button'>+</button>
                    </div>
                </div>
            </form>
            
        </div>
    );
}

export default DenominationsForm;