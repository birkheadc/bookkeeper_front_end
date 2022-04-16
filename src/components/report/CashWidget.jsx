import React, { useEffect, useState } from 'react';
import './CashWidget.css'
import DenominationSelect from './DenominationSelect';

function CashWidget(props) {

    const [display, setDisplay] = useState(props.display === 'true');
    const [denominations, setDenominations] = useState(props.denominations);
    const [activeDenominations, setActiveDenominations] = useState([]);

    const [totalCash, setTotalCash] = useState(0);

    useEffect(() => {

        const getDefaultDenominations = function() {
            let defaults = [];
            denominations.forEach(element => {
                if (element.isDefault === true) {
                    defaults.push(element);
                }
            });
            return defaults;
        }

        const active = getDefaultDenominations(denominations);
        setActiveDenominations(active);
    }, [denominations])



    const updateTotalCash = () => {
        let total = 0;

        activeDenominations.forEach(element => {
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
        console.log("Add Denomination: " + value)
    }

    const promptNewDenomination = () => {
        console.log("Prompt new denomination")
    }

    const displayDenominations = function() {
        if (display === false) {
            return null;
        }
        return activeDenominations.map(
            denomination =>
            <div className='cash-widget-row' key={denomination.value}>
                <label htmlFor={'cash-widget-input$' + denomination.value}>{denomination.value}</label>
                <input className='cash-widget-input' id={'cash-widget-input$' + denomination.value} onChange={updateTotalCash} type='number'></input>
            </div>
        );
    }

    return(
        <div className='cash-widget'>
            <div className='cash-widget-top'>
                    <h3>Cash</h3><input disabled type='number' value={totalCash}></input><button onClick={expandOrCollapse} type='button'>exp/col</button>
                </div>
                <div className='cash-widget-body'>
                    {displayDenominations()}
                </div>
                <DenominationSelect denominations={denominations} handleAddDenomination={handleAddDenomination} promptNewDenomination={promptNewDenomination} />
        </div>
    );
}

export default CashWidget;