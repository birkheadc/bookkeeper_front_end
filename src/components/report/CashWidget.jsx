import React, { useState } from 'react';
import './CashWidget.css'
import DenominationSelect from './DenominationSelect';
import { LocaleConversions } from '../../helpers';

function CashWidget(props) {

    const [display, setDisplay] = useState(props.display === 'true');

    const [totalCash, setTotalCash] = useState(0);

    const updateTotalCash = () => {
        let total = 0;

        props.activeDenominations.forEach(element => {
            const input = document.getElementById('cash-widget-input$' + element.value);
            if (isNaN(input.value) || input.value < 0) {
                input.value = 0;
            }
            total += input.value * element.value;
        });
        props.handleChange(total);
        setTotalCash(total);
    }

    const expandOrCollapse = () => {
        if (display === true) {
            collapse();
        }
        else {
            expand();
        }
    }

    const expand = () => {
        setDisplay(true);
    }

    const collapse = () => {
        setTotalCash(0);
        setDisplay(false);
    }

    const handleAddDenomination = (value) => {
        props.handleAddDenomination(value);
    }

    const promptNewDenomination = () => {
        props.promptNewDenomination();
    }

    const displayDenominations = function() {
        if (display === false) {
            return null;
        }
        return (
            <div className='cash-widget-denominations-wrapper'>
                <h5>Bills</h5>
                {props.activeDenominations.map(
                    denomination =>
                    <div className='cash-widget-row' key={denomination.value}>
                        <label className='report-transactions-label' htmlFor={'cash-widget-input$' + denomination.value}>{LocaleConversions.formatNumber(denomination.value)}</label>
                        <input className='cash-widget-input report-input' id={'cash-widget-input$' + denomination.value} onChange={updateTotalCash} type='number'></input>
                    </div>
                )}
            </div>
        );
    }

    const displayDenominationSelect = function() {
        if (display === false) {
            return null;
        }
        return (
            <DenominationSelect denominations={props.denominations} handleAddDenomination={handleAddDenomination} promptNewDenomination={promptNewDenomination} />
        );
    }

    return(
        <div className='cash-widget'>
            <h4>Cash</h4>
            <div className='cash-widget-top'>
                <div className='cash-widget-row cash-widget-total-row'>
                    <label className='' htmlFor='total-cash-input'>Total</label>
                    <input className='cash-widget-total-cash-input' disabled id='total-cash-input' type='number' value={totalCash}></input>
                    <button className='cash-toggle-button' onClick={expandOrCollapse} type='button'>---</button>
                </div>

            </div>
            <div className='cash-widget-body'>
                {displayDenominations()}
                {displayDenominationSelect()}
            </div>
                
        </div>
    );
}

export default CashWidget;