import { useCallback, useEffect, useState } from 'react';
import CashWidget from './CashWidget';
import './ReportPrompt.css'
import TransactionSelect from './TransactionSelect';
import TransactionWidget from './TransactionWidget';
import getNewUUID from '../../helpers/GetNewUUID';
import postReport from '../../api/postReport/PostReport';
import postTransactionTypes from '../../api/postReport/PostTransactionTypes';
import postDenominations from '../../api/postReport/PostDenominations';

function ReportPrompt(props) {

    const [date, setDate] = useState(new Date());
    const [cash, setCash] = useState(0);

    const [hasAddedDefaults, setAddedDefaults] = useState(false);

    const [transactionTypes, setTransactionTypes] = useState(props.transactionTypes);
    const [earningTypes, setEarningTypes] = useState();
    const [expenseTypes, setExpenseTypes] = useState();

    const [activeEarningTypes, setActiveEarningTypes] = useState();
    const [activeExpenseTypes, setActiveExpenseTypes] = useState();

    const [denominations, setDenominations] = useState(props.denominations);
    const [activeDenominations, setActiveDenominations] = useState([]);

    const addActiveEarnings = useCallback((names) => {
        let earnings = [];
        for (let i = 0; i < names.length; i++) {
            earnings.push({
                'name': names[i],
                'polarity': 1,
                'key': getNewUUID(),
                'value': 0
            })
        }
        setActiveEarningTypes(earnings);
    }, [activeEarningTypes]);

    const addActiveExpenses = useCallback((names) => {
        let expenses = [];
        for (let i = 0; i < names.length; i++) {
            expenses.push({
                'name': names[i],
                'polarity': -1,
                'key': getNewUUID(),
                'value': 0
            })
        }
        setActiveExpenseTypes(expenses);
    }, [activeExpenseTypes]);

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
                    defaultEarningTypes.push(element.name);
                }
            }
            else {
                expenseTypes.push(element);
                if (element.isDefault === true && hasAddedDefaults === false) {
                    defaultExpenseTypes.push(element.name);
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
        const earning = {
            'name': name,
            'polarity': 1,
            'key': getNewUUID(),
            'value': 0
        }
        if (activeEarningTypes == null) {
            setActiveEarningTypes([earning]);
        }
        else {
            setActiveEarningTypes([...activeEarningTypes, earning]);
        }
    }

    const addActiveExpense = function(name) {
        const expense = {
            'name': name,
            'polarity': -1,
            'key': getNewUUID(),
            'value': 0
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

    const handleCashChange = (value) => {
        setCash(value);
    }

    const createNewTransaction = function(name, polarity) {
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
        if (cash > 0) {
            earnings.push({
                'date': date,
                'type': 'cash',
                'amount': cash,
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
                    'note': ''
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
                    'note': ''
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
                    'isDefault': false
                })
            });
        }
        if (activeExpenseTypes != null && activeExpenseTypes.length > 0) {
            activeExpenseTypes.forEach(element => {
                all.push({
                    'name': element.name,
                    'polarity': element.polarity,
                    'isDefault': false
                })
            });
        }
        return all;
    }

    const getAllActiveDenominations = function() {
        return activeDenominations;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("TRANSACTIONS");
        console.log(buildTransactions());
        console.log("ACTIVE TRANSACTION TYPES");
        console.log(getAllActiveTransactionTypes());
        console.log("ACTIVE DENOMINATIONS");
        console.log(getAllActiveDenominations());
        console.log("ALL DENOMINATIONS");
        console.log(denominations);
        
        postReport(process.env.REACT_APP_BOOKKEEPER_URL, buildTransactions());

        postTransactionTypes(process.env.REACT_APP_BOOKKEEPER_URL, getAllActiveTransactionTypes());

        postDenominations(process.env.REACT_APP_BOOKKEEPER_URL, getAllActiveDenominations());
    }

    const handleAddDenomination = (value) => {
        console.log("test");
        if (isNaN(value)) {
            return;
        }
        console.log("b")
        for (let i = 0; i < activeDenominations.length; i++) {
            if (activeDenominations[i].value.toString() === value.toString()) {
                return;
            }
        }
        console.log("c")
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
        createNewDenomination(value);
    }

    const addActiveDenomination = function(value) {
        setActiveDenominations([...activeDenominations, {
            'value': parseInt(value),
            'isDefault': false
        }]);
    }

    return(
        <form className='report-form' onSubmit={handleSubmit}>
            <div>
                <h2>Earnings</h2>
                <CashWidget display={props.isCashDefault} denominations={denominations} activeDenominations={activeDenominations} handleChange={handleCashChange} handleAddDenomination={handleAddDenomination} promptNewDenomination={promptNewDenomination}/>
                <TransactionWidget handleValueChange={handleValueChange} transactions={activeEarningTypes} /> 
                <TransactionSelect handleAddTransaction={handleAddEarning} promptNewTransaction={promptNewEarning} transactions={earningTypes} />
            </div>
            <div>
                <h2>Expenses</h2>
                <TransactionWidget handleValueChange={handleValueChange} transactions={activeExpenseTypes} />
                <TransactionSelect handleAddTransaction={handleAddExpense} promptNewTransaction={promptNewExpense} transactions={expenseTypes} />
            </div>
            <button type='submit'>Submit</button>
        </form>
    );
}

export default ReportPrompt;