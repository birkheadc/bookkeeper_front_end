import React from 'react';

function CalculatorRow(props) {

    const handleChange = (e) => {
        const value = e.target.value;
        const label = e.target.getAttribute('data-label');
        props.updateValue(label, value);
    }

    const resetValue = () => {
        const input = document.getElementById('calculator-row_' + props.value.label);
        input.value = 0;
        const label = input.getAttribute('data-label');
        props.updateValue(label, 0);
    }

    return(
        <div className='calculator-row-wrapper'>
            <label htmlFor={'calculator-row_' + props.value.label}>{props.value.label}</label>
            <input className='input-number' data-label={props.value.label} data-multiplier={props.value.multiplier} id={'calculator-row_' + props.value.label} onChange={handleChange} onClick={(e) => e.target.select()} type='number' value={props.value.value}></input>
            <button onClick={resetValue} type='button'>Reset</button>
        </div>
    );
}

export default CalculatorRow;