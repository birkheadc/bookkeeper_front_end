import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './Settings.css'
import { Api } from '../../api';
import CategoriesForm from './categoriesForm/CategoriesForm';
import DenominationsForm from './denominationsForm/DenominationsForm';
import ChangePasswordForm from './changePasswordForm/ChangePasswordForm';
import SettingsForm from './settingsForm/SettingsForm';

function Settings(props) {

    const [settings, setSettings] = useState();

    useEffect(() => {
        async function fetchAndSetSettings() {
            const newSettings = await Api.fetchSettings();
            setSettings(newSettings);
        }

        if (settings == null) {
            fetchAndSetSettings();
        }
    }, [settings]);

    function renderSettingsForm() {
        if (settings == null) {
            return null;
        }
        return (
            <SettingsForm settings={settings} />
        );
    }

    function renderCategoriesForm() {
        if (settings == null) {
            return null;
        }
        return (
            <CategoriesForm settings={settings} />
        );
    }

    function renderDenominationsForm() {
        if (settings == null) {
            return null;
        }
        return (
            <DenominationsForm settings={settings} />
        );
    }

    function renderChangePasswordForm() {
        if (settings == null) {
            return null;
        }
        return (
            <ChangePasswordForm settings={settings} />
        );
    }

    return (
        <div>
            <h1>Settings</h1>
            {renderSettingsForm()}
            {renderCategoriesForm()}
            {renderDenominationsForm()}
            {renderChangePasswordForm()}
        </div>
    );
}

export default Settings;

//     const [transactionNamesToDelete, setTransactionNamesToDelete] = useState([]);
//     const [denominationValuesToDelete, setDenominationValuesToDelete] = useState([]);

//     const [settings, setSettings] = useState();
//     const [transactionTypes, setTransactionTypes] = useState();
//     const [denominations, setDenominations] = useState();

//     const [status, setStatus] = useState('');

//     useEffect(() => {

//         const getData = async function() {
//             setStatus('Loading');
//             try {
//                 let settings = await Api.fetchSettings();
//                 setSettings(settings);
//                 let transactions = await Api.fetchTransactionTypes();
//                 setTransactionTypes(transactions);
//                 let denominations = await Api.fetchDenominations();
//                 setDenominations(denominations);    
//                 setStatus('');
//             }
//             catch(e) {
//                 setStatus(e);
//             }
//         }

//         getData();
//     }, []);

//     const handleSettingChangeString = (e) => {
        
//     }

//     const handleSettingChangeNumber = (e) => {

//     }

//     const handleSettingChangeCheckbox = (e) => {
//         const name = e.target.getAttribute('data-name');
//         const value = e.target.checked;

//         let newSettings = {...settings};
//         newSettings[name] = value ? 'true' : 'false';
        
//         setSettings(newSettings);
//     }

//     const handleTransactionIsDefaultChange = (e) => {
//         const name = e.target.getAttribute('data-name');
//         const value = e.target.checked;

//         let newTransactions = [...transactionTypes];
//         let newTransaction;
//         for (let i = 0; i < newTransactions.length; i++) {
//             if (newTransactions[i].name === name) {
//                 newTransaction = newTransactions[i];
//                 break;
//             }
//         }
//         if (newTransaction === undefined) {
//             return;
//         }
//         newTransaction.isDefault = value;
//         setTransactionTypes(newTransactions);
//     }

//     const handleNewTransactionType = () => {
//         const name = prompt("Enter name of new transaction category.");
//         if (name == null || name.length < 1) {
//             return;
//         }
//         for (let i = 0; i < transactionTypes.length; i++) {
//             if (transactionTypes[i].name === name) {
//                 alert("A category with that name already exists.");
//                 return;
//             }
//         }
//         const type = {
//             'name': name,
//             'isDefault': false,
//             'polarity': 1
//         }
//         setTransactionTypes([...transactionTypes, type]);
//     }

//     const handleTransactionPolarityChange = (e) => {
//         const name = e.target.getAttribute('data-name');
//         const value = e.target.value;

//         let newTransactions = [...transactionTypes];
//         let newTransaction;
//         for (let i = 0; i < newTransactions.length; i++) {
//             if (newTransactions[i].name === name) {
//                 newTransaction = newTransactions[i];
//                 break;
//             }
//         }
//         if (newTransaction === undefined) {
//             return;
//         }

//         newTransaction.polarity = value;
//         setTransactionTypes(newTransactions);
//     }

//     const handleDeleteTransaction = (e) => {
//         const name = e.target.getAttribute('data-name');
//         let newTransactions = [...transactionTypes];
//         for (let i = 0; i < newTransactions.length; i++) {
//             if (newTransactions[i].name === name) {
//                 newTransactions.splice(i, 1);
//                 break;
//             }
//         }
//         setTransactionTypes(newTransactions);
//         setTransactionNamesToDelete([...transactionNamesToDelete, name]);
//     }

//     const handleNewDenomination = () => {
//         const value = prompt("Enter value of new denomination.");
//         if (value == null) {
//             return;
//         }
//         if (isNaN(value)) {
//             alert('Must be a number!');
//             return;
//         }
//         if (value <= 0) {
//             alert('Must be a positive number!');
//             return;
//         }
//         for (let i = 0; i < denominations.length; i++) {
//             if (denominations[i].value.toString() === value) {
//                 alert("A denomination with that value already exists.");
//                 return;
//             }
//         }
//         const denomination = {
//             'value': value,
//             'isDefault': false
//         }
//         setDenominations([...denominations, denomination]);
//     }

//     const handleDeleteDenomination = (e) => {
//         const value = e.target.getAttribute('data-value');
//         let newDenominations = [...denominations];
//         for (let i = 0; i < newDenominations.length; i++) {
//             if (newDenominations[i].value.toString() === value) {
//                 newDenominations.splice(i, 1);
//                 break;
//             }
//         }
//         setDenominations(newDenominations);
//         setDenominationValuesToDelete([...denominationValuesToDelete, value]);
//     }

//     const handleDenominationIsDefaultChange = (e) => {
//         const value = e.target.getAttribute('data-value');
//         const checked = e.target.checked;

//         let newDenominations = [...denominations];
//         let newDenomination;
//         for (let i = 0; i < newDenominations.length; i++) {
//             Utils.devlog(newDenominations[i].value);
//             Utils.devlog(value);
//             if (newDenominations[i].value.toString() === value) {
//                 newDenomination = newDenominations[i];
//                 break;
//             }
//         }
//         if (newDenomination === undefined) {
//             return;
//         }

//         newDenomination.isDefault = checked;
//         setDenominations(newDenominations);
//     }

//     const renderSettings = function() {
//         if (settings == null) {
//             return null;
//         }
//         return (
//             <div>
//                 <SettingWidget width={props.width} handleChange={handleSettingChangeCheckbox} label={'Is Cash On By Default'} name={'isCashDefault'} type={'checkbox'} value={settings.isCashDefault === 'true' ? true : false}/>
//             </div>
//         );
//     }

//     const renderTransactionTypes = function() {
//         if (transactionTypes == null) {
//             return null;
//         }
//         return (
//                 <TransactionTypeWidget width={props.width} handleDeleteTransaction={handleDeleteTransaction} handleIsDefaultChange={handleTransactionIsDefaultChange} handleNewTransactionType={handleNewTransactionType} handlePolarityChange={handleTransactionPolarityChange} transactionTypes={transactionTypes}/>
//         );
//     }

//     const renderDenominations = function() {
//         if (denominations == null) {
//             return null;
//         }
//         Utils.devlog(denominations);
//         return (
//             <DenominationWidget width={props.width} denominations={denominations} handleDeleteDenomination={handleDeleteDenomination} handleIsDefaultChange={handleDenominationIsDefaultChange} handleNewDenomination={handleNewDenomination}/>
//         );
//     }

//     const changePassword = async (e) => {
//         e.preventDefault();
//         setStatus('Submitting');
//         try {
//             const oldPassword = document.getElementById('settings-change-password-old-password').value;
//             const newPassword = document.getElementById('settings-change-password-new-password').value;
//             await Api.changePassword(oldPassword, newPassword);
//             props.handleLogin(newPassword);
//             setStatus('');
//         }
//         catch(e) {
//             setStatus(e);
//         }
//     }

//     const renderChangePasswordForm = function() {
//         return (
//             <div className='settings-change-password-form padded margined bordered'>
//                 <h2>Change Password</h2>
//                 <form onSubmit={changePassword}>
//                     <div className='settings-change-password-form'>
//                         <div className='settings-change-password-form-row'>
//                             <label htmlFor='settings-change-password-old-password'>Old Password</label>
//                             <input className='login-form-input' id='settings-change-password-old-password' type='password'></input>
//                         </div>
//                         <div className='settings-change-password-form-row'>
//                             <label htmlFor='settings-change-password-new-password'>New Password</label>
//                             <input className='login-form-input' id='settings-change-password-new-password' type='password'></input>
//                         </div>
//                         <div className='settings-change-password-button-wrapper'>
//                             <button type='submit'>Submit</button>
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         );
//     }

//     const renderForm = function() {
//         if (status !== '') {
//             return (
//                 <h2>{status}</h2>
//             );
//         }
//         return (
//             <>
//                 <div className='settings-section-wrapper'>
//                     <form onSubmit={handleSubmit}>
//                         {renderSettings()}
//                         {renderTransactionTypes()}
//                         {renderDenominations()}
//                         <div className='settings-button-wrapper'>
//                             <button onClick={handleCancel} type='button'>Cancel</button>
//                             <button type='submit'>Submit</button>
//                         </div>
//                     </form>
//                 </div>
//                 {renderChangePasswordForm()}
//             </>

//         );
//     }

//     const handleCancel = () => {
//         Utils.devlog("Cancel");
//         window.location.reload();
//     }

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setStatus('Submitting');
//         try {
//             await Api.deleteTransactionTypes(transactionNamesToDelete).next
//             await Api.deleteDenominations(denominationValuesToDelete);
//             await Api.postSettings(settings);
//             await Api.postTransactionTypes(transactionTypes);
//             await Api.postDenominations(denominations);
//             setStatus('');
//         }
//         catch(e) {
//             setStatus(e);
//         }
//     }

//     return(
//         <div>
//             <h1>Settings</h1>
//             {renderForm()}
//         </div>
//     );
// }