import { useEffect, useState } from 'react';
import CashWidget from './CashWidget';
import './ReportPrompt.css'
import TransactionSelect from './TransactionSelect';
import TransactionWidget from './TransactionWidget';

function ReportPrompt(props) {

    const [transactionTypes, setTransactionTypes] = useState(props.transactionTypes);
    const [earningTypes, setEarningTypes] = useState();
    const [expenseTypes, setExpenseTypes] = useState();

    const [defaultEarningTypes, setDefaultEarningTypes] = useState();
    const [defaultExpenseTypes, setDefaultExpenseTypes] = useState();

    const [activeEarningTypes, setActiveEarningTypes] = useState();
    const [activeExpenseTypes, setActiveExpenseTypes] = useState();

    useEffect(() => {
        let earningTypes = [];
        let expenseTypes = [];
        let defaultEarningTypes = [];
        let defaultExpenseTypes = [];

        transactionTypes.forEach(element => {
            if (element.polarity === 1) {
                earningTypes.push(element);
                if (element.isDefault === true) {
                    defaultEarningTypes.push(element);
                }
            }
            else {
                expenseTypes.push(element);
                if (element.isDefault === true) {
                    defaultExpenseTypes.push(element);
                }
            }
        });
        setEarningTypes(earningTypes);
        setExpenseTypes(expenseTypes);
        setDefaultEarningTypes(defaultEarningTypes);
        setDefaultExpenseTypes(defaultExpenseTypes);

        setActiveEarningTypes(defaultEarningTypes);
        setActiveExpenseTypes(defaultExpenseTypes);
    }, [transactionTypes]);

    const handleAddEarning = (name) => {

        const earning = {
            'name': name,
            'polarity': 1,
            'isDefault': false
        }
        setActiveEarningTypes([...activeEarningTypes, earning]);
    }

    const handleAddExpense = (name) => {
        activeExpenseTypes.forEach(element => {
            if (element.name === name) {
                return;
            }
        });
        expenseTypes.forEach(element => {
            if (element.name === name) {
                setActiveExpenseTypes([...activeExpenseTypes, element]);
            }
        });
    }

    const promptNewEarning = () => {
        console.log("Prompt new earning");
    }

    const promptNewExpense = () => {
        console.log("Prompt new earning");
    }

    return(
        <form className='report-form'>
            <div>
                <h2>Earnings</h2>
                <CashWidget display={props.isCashDefault} denominations={props.denominations}/>
                <TransactionWidget transactions={activeEarningTypes} />
                <TransactionSelect handleAddTransaction={handleAddEarning} promptNewTransaction={promptNewEarning} transactions={earningTypes} />
            </div>
            <div>
                <h2>Expenses</h2>
                <TransactionWidget transactions={activeExpenseTypes} />
                <TransactionSelect handleAddTransaction={handleAddExpense} promptNewTransaction={promptNewExpense} transactions={expenseTypes} />
            </div>
        </form>
    );
}

export default ReportPrompt;