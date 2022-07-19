import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Popup from 'reactjs-popup';
import './Calculator.css'
import CalculatorRow from './CalculatorRow';

function Calculator(props) {

    const [total, setTotal] = useState(0);

    const [values, setValues] = useState();

    const [open, setOpen] = useState(false);

    useEffect(() => {

        function generateValues() {
            let newValues = [];
            newValues.push({
                label: 'Previous Value',
                multiplier: 1,
                value: props.oldTotal
            })
            for (let i = 0; i < props.denominations.length; i++) {
                if (props.denominations[i].isDefault === true) {
                    const value = {
                        label: props.denominations[i].value,
                        multiplier: props.denominations[i].value,
                        value: 0
                    }
                    newValues.push(value);
                }
            }
            setValues(newValues);
        }

        if (props.denominations != null) {
            generateValues();
        }
    }, [props.oldTotal, props.denominations, open]);

    const close = () => {
        setOpen(false);
    }

    const handleToggleOpen = () => {
        setOpen(o => !o);
    }

    const submit = () => {
        props.handleSubmit(total);
        for (let i = 0; i < values.length; i++) {
            if (isNaN(values[i].label) === false) {
                addDefaultDenomination(parseInt(values[i].label));
            }
        }
        close();
    }

    useEffect(() => {
        if (values == null) {
            return;
        }
        let total = 0;
        for (let i = 0; i < values.length; i++) {
            total+= values[i].multiplier * values[i].value;
        }
        setTotal(total);
    }, [values]);

    const updateValue = (label, value) => {
        let newValues = [...values];
        for (let i = 0; i < newValues.length; i++) {
            if (newValues[i].label.toString() === label.toString()) {
                newValues[i].value = value;
            }
        }
        setValues(newValues);
    }

    const handleAddDenomination = (e) => {
        const value = e.target.value;
        if (value === 'default') {
            return;
        }
        if (value === 'new') {
            promptNewDenomination();
            resetDenominationSelect();
            return;
        }
        addDenomination(parseInt(value));
        resetDenominationSelect();
    }

    function promptNewDenomination() {
        const value = prompt('Enter value for new denomination.');
        if (value == null || value === '') {
            return;
        }
        if (isNaN(value)) {
            alert('Invalid value.');
            return;
        }
        addDenomination(parseInt(value));
    }

    function addDenomination(value) {
        for (let i = 0; i < values.length; i++) {
            if (values[i].label === value) {
                alert('That value is already being used!')
                return;
            }
        }
        let newValues = [...values];
        newValues.push({
            label: value,
            multiplier: value,
            value: 0
        });
        setValues(newValues);
    }

    function addDefaultDenomination(value) {
        props.handleAddDefaultDenominationWithValue(value);
    }

    function resetDenominationSelect() {
        document.getElementById('calculator-denomination-select').value = 'default';
    }

    if (values == null) {
        return null;
    }

    return(
        <div>
            <button className='report-form-calculator-button' onClick={handleToggleOpen} type='button'>Calc</button>
            <Popup open={open} onClose={close} modal>
                <div className='calculator-wrapper'>
                    <h3>Total: {total}</h3>
                    <form>
                        {values.map(
                            value =>
                            <CalculatorRow value={value} updateValue={updateValue} key={value.label}/>
                        )}
                    </form>
                    <div className='calculator-row-wrapper'>
                        <select id='calculator-denomination-select' onChange={handleAddDenomination}>
                            <option value='default'>Add Denomination</option>
                            {props.denominations.map(
                                denomination =>
                                <option key={denomination.value} value={denomination.value}>{denomination.value}</option>
                            )}
                            <option value='new'>Create New</option>
                        </select>
                    </div>
                    <div className='calculator-button-wrapper large-margin-top'>
                        <button onClick={close} type='button'>Cancel</button>
                        <button onClick={submit} type='button'>Submit</button>
                    </div>
                </div>
            </Popup>
        </div>
    );
}

export default Calculator;