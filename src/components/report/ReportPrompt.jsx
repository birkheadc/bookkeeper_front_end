import { useCallback, useEffect, useState } from 'react';
import CashWidget from './CashWidget';
import './ReportPrompt.css'
import TransactionSelect from './TransactionSelect';
import TransactionWidget from './TransactionWidget';
import { Utils, TransactionCategoryHelpers } from '../../helpers';
import { Api } from '../../api';

function ReportPrompt(props) {
    
    const [date, setDate] = useState(props.defaultDate);
    const [cash, setCash] = useState(0);

    const [hasAddedDefaults, setAddedDefaults] = useState(false);

    const [transactionTypes, setTransactionTypes] = useState(props.transactionTypes);
    const [earningTypes, setEarningTypes] = useState();
    const [expenseTypes, setExpenseTypes] = useState();

    const [activeEarningTypes, setActiveEarningTypes] = useState();
    const [activeExpenseTypes, setActiveExpenseTypes] = useState();

    const [denominations, setDenominations] = useState(props.denominations);
    const [activeDenominations, setActiveDenominations] = useState([]);

    const addActiveEarnings = useCallback((elements) => {
        let earnings = [];
        for (let i = 0; i < elements.length; i++) {
            earnings.push({
                'name': TransactionCategoryHelpers.convertTransactionTypeName(elements[i].name),
                'polarity': 1,
                'key': Utils.getNewUUID(),
                'value': 0,
                'isDefault': true,
                'note': ''
            })
        }
        setActiveEarningTypes(earnings);
    }, []);

    const addActiveExpenses = useCallback((elements) => {
        let expenses = [];
        for (let i = 0; i < elements.length; i++) {
            expenses.push({
                'name': TransactionCategoryHelpers.convertTransactionTypeName(elements[i].name),
                'polarity': -1,
                'key': Utils.getNewUUID(),
                'value': 0,
                'isAddToCash': false,
                'isDefault': true,
                'note': ''
            })
        }
        setActiveExpenseTypes(expenses);
    }, []);

    useEffect(() => {
        let earningTypes = [];
        let expenseTypes = [];
        let defaultEarningTypes = [];
        let defaultExpenseTypes = [];
        let defaultDenominations = [];

        transactionTypes.forEach(element => {
            if (element.polarity === 1) {
                earningTypes.push(element);
                if (element.isDefault === true && hasAddedDefaults === false) {
                    defaultEarningTypes.push(element);
                }
            }
            else {
                expenseTypes.push(element);
                if (element.isDefault === true && hasAddedDefaults === false) {
                    defaultExpenseTypes.push(element);
                }
            }
        });

        denominations.forEach(element => {
            if (element.isDefault === true && hasAddedDefaults === false) {
                defaultDenominations.push(element);
            }
        });

        setEarningTypes(earningTypes);
        setExpenseTypes(expenseTypes);

        if (hasAddedDefaults === false) {
            addActiveEarnings(defaultEarningTypes);
            addActiveExpenses(defaultExpenseTypes);
            setActiveDenominations(defaultDenominations);
            setAddedDefaults(true);
        }

    }, [transactionTypes, denominations, hasAddedDefaults, addActiveEarnings, addActiveExpenses]);

    const addActiveEarning = function(name) {
        if (TransactionCategoryHelpers.isTransactionNameValid(name) === false) {
            return;
        }
        const earning = {
            'name': TransactionCategoryHelpers.convertTransactionTypeName(name),
            'polarity': 1,
            'key': Utils.getNewUUID(),
            'value': 0,
            'isDefault': false,
            'note': ''
        }
        if (activeEarningTypes == null) {
            setActiveEarningTypes([earning]);
        }
        else {
            setActiveEarningTypes([...activeEarningTypes, earning]);
        }
    }

    const addActiveExpense = function(name) {
        if (TransactionCategoryHelpers.isTransactionNameValid(name) === false) {
            return;
        }
        const expense = {
            'name': TransactionCategoryHelpers.convertTransactionTypeName(name),
            'polarity': -1,
            'key': Utils.getNewUUID(),
            'value': 0,
            'isDefault': false,
            'isAddToCash': false,
            'note': ''
        }
        if (activeExpenseTypes == null) {
            setActiveExpenseTypes([expense]);
        }
        else {
            setActiveExpenseTypes([...activeExpenseTypes, expense]);
        }
    }

    const handleAddEarning = (name) => {
        addActiveEarning(name);
    }

    const handleAddExpense = (name) => {
        addActiveExpense(name);
    }

    const handleNoteChange = (e) => {
        const note = e.target.value;
        const key = e.target.getAttribute('data-key');
        const polarity = e.target.getAttribute('data-polarity');

        if (polarity === -1 || polarity === '-1') {
            for (let i = 0; i < activeExpenseTypes.length; i ++) {
                if (activeExpenseTypes[i].key === key) {
                    let types = [...activeExpenseTypes];
                    types[i].note = note;
                    setActiveExpenseTypes(types);
                }
            }
        }
        else {
            for (let i = 0; i < activeEarningTypes.length; i ++) {
                if (activeEarningTypes[i].key === key) {
                    let types = [...activeEarningTypes];
                    types[i].note = note;
                    setActiveEarningTypes(types);
                }
            }
        }
    }

    const handleValueChange = (e) => {

        const value = e.target.value;
        const key = e.target.getAttribute('data-key');
        const polarity = e.target.getAttribute('data-polarity');

        if (polarity === -1 || polarity === '-1') {
            for (let i = 0; i < activeExpenseTypes.length; i ++) {
                if (activeExpenseTypes[i].key === key) {
                    let types = [...activeExpenseTypes];
                    types[i].value = value;
                    setActiveExpenseTypes(types);
                }
            }
        }
        else {
            for (let i = 0; i < activeEarningTypes.length; i ++) {
                if (activeEarningTypes[i].key === key) {
                    let types = [...activeEarningTypes];
                    types[i].value = value;
                    setActiveEarningTypes(types);
                }
            }
        }
    }

    const calculateBonusCash = function() {
        if (activeExpenseTypes.length < 1) {
            return 0;
        }
        
        let bonus = 0;

        activeExpenseTypes.forEach(element => {
            if (element.isAddToCash === true) {
                bonus += element.value;
            }
        });

        return bonus;
    }

    const handleCashChange = (value) => {
        setCash(value);
    }

    const createNewTransaction = function(name, polarity) {
        if (TransactionCategoryHelpers.isTransactionNameValid(name) === false) {
            return;
        }
        if (polarity === 1) {
            addActiveEarning(name);
        }
        else {
            addActiveExpense(name);
        }
        const transaction = {
            'name': name,
            'polarity': polarity,
            'isDefault': false
        }
        setTransactionTypes([...transactionTypes, transaction]);
    }

    const promptNewEarning = () => {
        const name = prompt("Enter name of new earning category:");
        createNewTransaction(name, 1);
    }

    const promptNewExpense = () => {
        const name = prompt("Enter name of new expense category:");
        createNewTransaction(name, -1);
    }

    const buildTransactions = function() {
        let earnings = buildEarnings();
        let expenses = buildExpenses();
        let transactions = earnings.concat(expenses);
        return transactions;
    }

    const buildEarnings = function() {
        let earnings = [];
        let cashAndBonus = cash + parseInt(calculateBonusCash());
        if (cashAndBonus > 0) {
            earnings.push({
                'date': date,
                'type': 'cash',
                'amount': cashAndBonus,
                'note': ''
            });
        }
        if (activeEarningTypes == null || activeEarningTypes.length < 1) {
            return earnings;
        }
        activeEarningTypes.forEach(element => {
            if (isNaN(element.value)) {
                return;
            }
            if (element.value > 0) {
                earnings.push({
                    'date': date,
                    'type': element.name,
                    'amount': element.value * element.polarity,
                    'note': element.note
                });
            }
        });
        return earnings;
    }

    const buildExpenses = function() {
        if (activeExpenseTypes == null || activeExpenseTypes.length < 1) {
            return [];
        }
        let expenses = [];
        activeExpenseTypes.forEach(element => {
            if (isNaN(element.value)) {
                return;
            }
            if (element.value > 0) {
                expenses.push({
                    'date': date,
                    'type': element.name,
                    'amount': element.value * element.polarity,
                    'note': element.note
                });
            }
        });
        return expenses;
    }
    
    const getAllActiveTransactionTypes = function() {
        let all = [];
        if (activeEarningTypes != null && activeEarningTypes.length > 0) {
            activeEarningTypes.forEach(element => {
                all.push({
                    'name': element.name,
                    'polarity': element.polarity,
                    'isDefault': element.isDefault
                })
            });
        }
        if (activeExpenseTypes != null && activeExpenseTypes.length > 0) {
            activeExpenseTypes.forEach(element => {
                all.push({
                    'name': element.name,
                    'polarity': element.polarity,
                    'isDefault': element.isDefault
                })
            });
        }
        return all;
    }

    const getAllActiveDenominations = function() {
        return activeDenominations;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        props.beginSubmit();
        await Api.postReport(buildTransactions());
        await Api.postTransactionTypes(getAllActiveTransactionTypes());
        await Api.postDenominations(getAllActiveDenominations());
        props.finishSubmit();
    }

    const handleAddDenomination = (value) => {
        if (isNaN(value)) {
            return;
        }
        for (let i = 0; i < activeDenominations.length; i++) {
            if (activeDenominations[i].value.toString() === value.toString()) {
                return;
            }
        }
        addActiveDenomination(value);
    }

    const createNewDenomination = function(value) {
        for (let i = 0; i < denominations.length; i++) {
            if (denominations[i].value.toString() === value.toString())
            {
                return;
            }
        }
        addActiveDenomination(value);
        setDenominations([...denominations, {
            'value': parseInt(value),
            'isDefault': false
        }])
    }

    const promptNewDenomination = () => {
        const value = prompt("Enter value of new denomination:");
        if (isNaN(value)) {
            return;
        }
        createNewDenomination(value);
    }

    const addActiveDenomination = function(value) {
        setActiveDenominations([...activeDenominations, {
            'value': parseInt(value),
            'isDefault': false
        }]);
    }

    const handleDateChange = (e) => {
        setDate(e.target.value);
        props.handleDateChange(e.target.value);
    }

    const handleCheckChange = (e) => {
        const key = e.target.getAttribute('data-key');
        const isChecked = e.target.checked;

        let expenses = [...activeExpenseTypes];
        let expense;
        for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].key === key) {
                expense = {...expenses[i]};
                expense.isAddToCash = isChecked;
                expenses[i] = expense;
                break;
            }
        }
        setActiveExpenseTypes(expenses);
    }

    return(
        <form className='report-form bordered padded margined' onSubmit={handleSubmit}>
            <h2>Record Transactions</h2>
            <div className='padded report-date report-transactions-row'>
                <label className='report-transactions-label' htmlFor={'report-form-date'}>Date</label>
                <input className='report-input' value={date} id={'report-form-date'} onChange={handleDateChange} type='date'></input>
            </div>
            <div className='padded report-transactions'>
                <h3>Earnings</h3>
                <CashWidget display={props.isCashDefault} denominations={denominations} activeDenominations={activeDenominations} handleChange={handleCashChange} handleAddDenomination={handleAddDenomination} promptNewDenomination={promptNewDenomination}/>
                <TransactionWidget polarity={1} handleNoteChange={handleNoteChange}  handleValueChange={handleValueChange} transactions={activeEarningTypes} /> 
                <TransactionSelect handleAddTransaction={handleAddEarning} promptNewTransaction={promptNewEarning} transactions={earningTypes} />
            </div>
            <div className='padded report-transactions'>
                <h3>Expenses</h3>
                <TransactionWidget polarity={-1} handleCheckChange={handleCheckChange} handleNoteChange={handleNoteChange} handleValueChange={handleValueChange} transactions={activeExpenseTypes} />
                <TransactionSelect handleAddTransaction={handleAddExpense} promptNewTransaction={promptNewExpense} transactions={expenseTypes} />
            </div>
            <div className='report-submit-button-wrapper'>
                <button className='report-submit-button' type='submit'>Submit</button>
            </div>
        </form>
    );
}

export default ReportPrompt;