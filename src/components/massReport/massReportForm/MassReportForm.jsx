import React from "react";
import { Utils } from "../../../helpers";
import { UserSettings } from "../../../helpers/settings";
import MassReportFormEntry from "../massReportFormEntry/MassReportFormEntry";
import './MassReportForm.css';

export default function MassReportForm(props) {

  const [canSubmit, setCanSubmit] = React.useState(false);
  const [transactions, setTransactions] = React.useState([]);

  React.useEffect(() => {
    if (transactions.length < 1) {
      setCanSubmit(false);
      return;
    }
    for (let i = 0; i < transactions.length; i++) {
      if (isTransactionValid(transactions[i]) === false) {
        setCanSubmit(false);
        return;
      }
    }
    setCanSubmit(true);
  }, [transactions]);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (transactions.length < 1) {
      return;
    }
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i];
      if (isTransactionValid(transaction) === false) {
        Utils.devlog('Following transaction is invalid: ', transaction);
        return;
      }
    }
    props.handleSubmit(transactions);
  }

  function isTransactionValid(transaction) {
    try {
      if (transaction.category === 'add-new' || transaction.category === '') {
        return false;
      }
    }
    catch {
      return false;
    }
    return true;
  }

  const addTransaction = () => {
    const newTransactions = [...transactions];
    newTransactions.push({
      category: '',
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      note: '',
      wasTakenFromCash: false
    });
    setTransactions(newTransactions);
  }

  const removeTransaction = (index) => {
    const newTransactions = [...transactions];
    newTransactions.splice(index, 1);
    setTransactions(newTransactions);
  }

  const updateTransaction = (transaction, index) => {
    const newTransactions = [...transactions];
    newTransactions[index] = transaction;
    setTransactions(newTransactions);
  }

  return (
    <form className="mass-report-form" onSubmit={handleSubmit}>
      {transactions.map(
        (transaction, index) =>
        <MassReportFormEntry key={index} transaction={transaction} removeTransaction={() => removeTransaction(index)} updateTransaction={(t) => updateTransaction(t, index)} />
      )}
      <button onClick={addTransaction} type='button'>+</button>
      <button disabled={!canSubmit} type='submit'>Submit</button>    
    </form>
  );
}