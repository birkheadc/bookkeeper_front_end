import React from "react";
import { UserSettings } from "../../../helpers/settings";
import './MassReportFormEntry.css';

export default function MassReportFormEntry(props) {

  const [categories, setCategories] = React.useState(UserSettings.retrieveExpenseCategories());

  function isCategoryNameUnique(category) {
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].name === category) return false;
    }
    return true;
  }

  const handleCategoryChange = (e) => {
    if (e.target.value === 'add-new') {
      const newCategory = prompt('Enter name of new category');
      if (newCategory == null || newCategory === '') return;
      if (isCategoryNameUnique(newCategory) === true) {
        const newCategories = [...categories];
        newCategories.push({
          name: newCategory,
          isDefault: false
        });
        setCategories(newCategories);
      }
      const newTransaction = getShallowCopyOfTransaction();
      newTransaction.category = newCategory;
      props.updateTransaction(newTransaction);
      return;
    }
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
        {categories.map(
          category =>
          <option key={category.name} value={category.name}>{category.name}</option>
        )}
        <option key='add-new' value='add-new'>Create New</option>
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