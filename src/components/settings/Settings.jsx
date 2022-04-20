import React, { useEffect, useState } from 'react';
import fetchDenominations from '../../api/fetchDenominations/FetchDenominations';
import fetchSettings from '../../api/fetchSettings/FetchSettings';
import fetchTransactionTypes from '../../api/fetchTransactionTypes/FetchTransactionTypes';
import postDenominations from '../../api/postReport/PostDenominations';
import postSettings from '../../api/postReport/PostSettings';
import postTransactionTypes from '../../api/postReport/PostTransactionTypes';
import DenominationWidget from './DenominationWidget';
import './Settings.css'
import SettingWidget from './SettingWidget';
import TransactionTypeWidget from './TransactionTypeWidget';

function Settings(props) {

    const [settings, setSettings] = useState();
    const [transactionTypes, setTransactionTypes] = useState();
    const [denominations, setDenominations] = useState();

    useEffect(() => {
        const getSettings = async function() {
            let settings = await fetchSettings();
            setSettings(settings);
        }

        const getTransactionTypes = async function() {
            let transactions = await fetchTransactionTypes();
            setTransactionTypes(transactions);
        }

        const getDenominations = async function() {
            let denominations = await fetchDenominations();
            setDenominations(denominations);
        }

        getSettings();
        getTransactionTypes();
        getDenominations();
    }, []);

    const handleSettingChangeString = (e) => {
        
    }

    const handleSettingChangeNumber = (e) => {

    }

    const handleSettingChangeCheckbox = (e) => {
        const name = e.target.getAttribute('data-name');
        const value = e.target.checked;

        let newSettings = {...settings};
        newSettings[name] = value ? 'true' : 'false';
        
        setSettings(newSettings);
    }

    const handleTransactionIsDefaultChange = (e) => {
        const name = e.target.getAttribute('data-name');
        const value = e.target.checked;

        let newTransactions = [...transactionTypes];
        let newTransaction;
        for (let i = 0; i < newTransactions.length; i++) {
            if (newTransactions[i].name === name) {
                newTransaction = newTransactions[i];
                break;
            }
        }
        if (newTransaction === undefined) {
            return;
        }
        newTransaction.isDefault = value;
        setTransactionTypes(newTransactions);
    }

    const handleTransactionPolarityChange = (e) => {
        const name = e.target.getAttribute('data-name');
        const value = e.target.value;

        let newTransactions = [...transactionTypes];
        let newTransaction;
        for (let i = 0; i < newTransactions.length; i++) {
            if (newTransactions[i].name === name) {
                newTransaction = newTransactions[i];
                break;
            }
        }
        if (newTransaction === undefined) {
            return;
        }

        newTransaction.polarity = value;
        setTransactionTypes(newTransactions);
    }

    const handleDenominationIsDefaultChange = (e) => {
        const value = e.target.getAttribute('data-value');
        const checked = e.target.checked;

        let newDenominations = [...denominations];
        let newDenomination;
        for (let i = 0; i < newDenominations.length; i++) {
            console.log(newDenominations[i].value);
            console.log(value);
            if (newDenominations[i].value.toString() === value) {
                newDenomination = newDenominations[i];
                break;
            }
        }
        if (newDenomination === undefined) {
            return;
        }

        newDenomination.isDefault = checked;
        setDenominations(newDenominations);
    }

    const renderSettings = function() {
        if (settings == null) {
            return null;
        }
        return (
            <SettingWidget handleChange={handleSettingChangeCheckbox} label={'Is Cash On By Default'} name={'isCashDefault'} type={'checkbox'} value={settings.isCashDefault == 'true' ? true : false}/>
        );
    }

    const renderTransactionTypes = function() {
        if (transactionTypes == null) {
            return null;
        }
        return (
            <TransactionTypeWidget handleIsDefaultChange={handleTransactionIsDefaultChange} handlePolarityChange={handleTransactionPolarityChange} transactionTypes={transactionTypes}/>
        );
    }

    const renderDenominations = function() {
        if (denominations == null) {
            return null;
        }
        console.log(denominations);
        return (
            <DenominationWidget denominations={denominations} handleIsDefaultChange={handleDenominationIsDefaultChange}/>
        );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postSettings(settings);
        postTransactionTypes(transactionTypes);
        postDenominations(denominations);
    }

    return(
        <div>
            <h1>Settings</h1>
            <form onSubmit={handleSubmit}>
                {renderSettings()}
                {renderTransactionTypes()}
                {renderDenominations()}
                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default Settings;