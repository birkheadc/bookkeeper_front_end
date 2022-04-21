import React, { useEffect, useState } from 'react';
import deleteDenominations from '../../api/deleteDenominations/DeleteDenominations';
import deleteTransactionTypes from '../../api/deleteTransactionTypes/DeleteTransactionTypes';
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

    const [transactionNamesToDelete, setTransactionNamesToDelete] = useState([]);
    const [denominationValuesToDelete, setDenominationValuesToDelete] = useState([]);

    const [settings, setSettings] = useState();
    const [transactionTypes, setTransactionTypes] = useState();
    const [denominations, setDenominations] = useState();

    const [status, setStatus] = useState('');

    useEffect(() => {

        const getData = async function() {
            setStatus('Loading');
            let settings = await fetchSettings();
            setSettings(settings);
            let transactions = await fetchTransactionTypes();
            setTransactionTypes(transactions);
            let denominations = await fetchDenominations();
            setDenominations(denominations);
            setStatus('');
        }

        getData();
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

    const handleNewTransactionType = () => {
        const name = prompt("Enter name of new transaction category.");
        for (let i = 0; i < transactionTypes.length; i++) {
            if (transactionTypes[i].name === name) {
                alert("A category with that name already exists.");
                return;
            }
        }
        const type = {
            'name': name,
            'isDefault': false,
            'polarity': 1
        }
        setTransactionTypes([...transactionTypes, type]);
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

    const handleDeleteTransaction = (e) => {
        const name = e.target.getAttribute('data-name');
        let newTransactions = [...transactionTypes];
        for (let i = 0; i < newTransactions.length; i++) {
            if (newTransactions[i].name === name) {
                newTransactions.splice(i, 1);
                break;
            }
        }
        setTransactionTypes(newTransactions);
        setTransactionNamesToDelete([...transactionNamesToDelete, name]);
    }

    const handleNewDenomination = () => {
        const value = prompt("Enter value of new denomination.");
        for (let i = 0; i < denominations.length; i++) {
            if (denominations[i].value.toString() === value) {
                alert("A denomination with that value already exists.");
                return;
            }
        }
        const denomination = {
            'value': value,
            'isDefault': false
        }
        setDenominations([...denominations, denomination]);
    }

    const handleDeleteDenomination = (e) => {
        const value = e.target.getAttribute('data-value');
        let newDenominations = [...denominations];
        for (let i = 0; i < newDenominations.length; i++) {
            if (newDenominations[i].value.toString() === value) {
                newDenominations.splice(i, 1);
                break;
            }
        }
        setDenominations(newDenominations);
        setDenominationValuesToDelete([...denominationValuesToDelete, value]);
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
            <TransactionTypeWidget handleDeleteTransaction={handleDeleteTransaction} handleIsDefaultChange={handleTransactionIsDefaultChange} handleNewTransactionType={handleNewTransactionType} handlePolarityChange={handleTransactionPolarityChange} transactionTypes={transactionTypes}/>
        );
    }

    const renderDenominations = function() {
        if (denominations == null) {
            return null;
        }
        console.log(denominations);
        return (
            <DenominationWidget denominations={denominations} handleDeleteDenomination={handleDeleteDenomination} handleIsDefaultChange={handleDenominationIsDefaultChange} handleNewDenomination={handleNewDenomination}/>
        );
    }

    const renderForm = function() {
        if (status !== '') {
            return (
                <h2>{status}</h2>
            );
        }
        return (
            <form onSubmit={handleSubmit}>
                {renderSettings()}
                {renderTransactionTypes()}
                {renderDenominations()}
                <button onClick={handleCancel} type='button'>Cancel</button>
                <button type='submit'>Submit</button>
            </form>
        );
    }

    const handleCancel = () => {
        console.log("Cancel");
        window.location.reload();
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Submitting');
        await deleteTransactionTypes(transactionNamesToDelete).next
        await deleteDenominations(denominationValuesToDelete);
        await postSettings(settings);
        await postTransactionTypes(transactionTypes);
        await postDenominations(denominations);
        setStatus('');
    }

    return(
        <div>
            <h1>Settings</h1>
            {renderForm()}
        </div>
    );
}

export default Settings;