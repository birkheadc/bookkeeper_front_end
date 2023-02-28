import React from "react";
import { UserSettings } from "../../../helpers/settings";
import './MassReportFormEntry.css';

export default function MassReportFormEntry(props) {

  const handleCategoryChange = (e) => {
    const newTransaction = getShallowCopyOfTransaction();
    newTransaction.category = e.target.value;
    props.updateTransaction(newTransaction);
  }

  const handleAmountChange = (e) => {
    const newTransaction = getShallowCopyOfTransaction();
    newTransaction.amount = e.target.value;
    props.updateTransaction(newTransaction);
  }

  const handleDateChange = (e) => {
    const newTransaction = getShallowCopyOfTransaction();
    newTransaction.date = e.target.value;
    props.updateTransaction(newTransaction);
  }

  const handleAddBackIntoCashChange = (e) => {
    const newTransaction = getShallowCopyOfTransaction();
    newTransaction.wasTakenFromCash = e.target.checked;
    props.updateTransaction(newTransaction);  
  }

  const handleNoteChange = (e) => {
    const newTransaction = getShallowCopyOfTransaction();
    newTransaction.note = e.target.value;
    props.updateTransaction(newTransaction);
  }

  const handleRemoveTransaction = () => {
    props.removeTransaction();
  }

  function getShallowCopyOfTransaction() {
    return {...props.transaction};
  }

  return (
    <div className="mass-report-entry">
      <select onChange={handleCategoryChange} value={props.transaction.category}>
        <option value=''>Select Category</option>
        {UserSettings.retrieveExpenseCategories().map(
          category =>
          <option key={category.name} value={category.name}>{category.name}</option>
        )}
      </select>
      <div>
        <label>₩</label>
        <input onChange={handleAmountChange} type='number' value={props.transaction.amount}></input>
      </div>
      <div>
        <label>Date</label>
        <input onChange={handleDateChange} type='date' value={props.transaction.date}></input>
      </div>
      <div>
        <label>Add Back Into Cash</label>
        <input checked={props.transaction.wasTakenFromCash} onChange={handleAddBackIntoCashChange} type='checkbox'></input>
      </div>
      <div>
        <label>Note</label>
        <input onChange={handleNoteChange} value={props.transaction.note}></input>
      </div>
      <button onClick={handleRemoveTransaction} type='button'>X</button>
    </div>
  );
}