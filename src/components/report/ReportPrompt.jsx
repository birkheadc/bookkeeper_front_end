import { useCallback, useEffect, useState } from 'react';
import CashWidget from './CashWidget';
import './ReportPrompt.css'
import TransactionSelect from './TransactionSelect';
import TransactionWidget from './TransactionWidget';
import getNewUUID from '../../helpers/GetNewUUID';
import postReport from '../../api/postReport/PostReport';

function ReportPrompt(props) {

    const [date, setDate] = useState(new Date());
    const [cash, setCash] = useState(0);

    const [hasAddedDefaults, setAddedDefaults] = useState(false);

    const [transactionTypes, setTransactionTypes] = useState(props.transactionTypes);
    const [earningTypes, setEarningTypes] = useState();
    const [expenseTypes, setExpenseTypes] = useState();

    const [activeEarningTypes, setActiveEarningTypes] = useState();
    const [activeExpenseTypes, setActiveExpenseTypes] = useState();

    const addActiveEarning = useCallback((name) => {
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
    }, [activeEarningTypes]);

    const addActiveExpense = useCallback((name) => {
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
    }, [activeExpenseTypes]);

    useEffect(() => {
        let earningTypes = [];
        let expenseTypes = [];
        let defaultEarningTypes = [];
        let defaultExpenseTypes = [];

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

        setEarningTypes(earningTypes);
        setExpenseTypes(expenseTypes);

        if (hasAddedDefaults === false) {

            defaultEarningTypes.forEach(element => {
                addActiveEarning(element.name);
            });
    
            defaultExpenseTypes.forEach(element => {
                addActiveExpense(element.name);
            });

            setAddedDefaults(true);
        }

    }, [transactionTypes, hasAddedDefaults, addActiveEarning, addActiveExpense]);

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
        console.log("test")
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("----------------------------------------");
        console.log("----------TOTAL UP THIS----------");
        console.log("Cash = " + cash);
        console.log(activeEarningTypes);
        console.log(activeExpenseTypes);
        console.log("----------------------------------------");
        
        postReport(process.env.REACT_APP_BOOKKEEPER_URL, buildTransactions());
    }

    return(
        <form className='report-form' onSubmit={handleSubmit}>
            <div>
                <h2>Earnings</h2>
                <CashWidget display={props.isCashDefault} denominations={props.denominations} handleChange={handleCashChange}/>
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