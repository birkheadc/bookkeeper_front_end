import React from 'react';
import './CategoriesForm.css'
import CategoriesFormRow from './CategoriesFormRow';

function CategoriesForm(props) {

    const handleAddCategory = () => {

    }

    return(
        <div className='settings-sub-section-wrapper'>
            <h2>Transaction Categories</h2>
            <hr></hr>
            <form>
                <h3>Earnings</h3>
                {props.settings.earningCategories.map(
                    earningCategory =>
                    <CategoriesFormRow category={earningCategory} handleChangeIsDefault={props.handleChangeIsDefaultEarning} handleDeleteCategory={props.handleDeleteEarning} key={earningCategory.name} />
                )}
                <h3>Expenses</h3>
                {props.settings.expenseCategories.map(
                    expenseCategory =>
                    <CategoriesFormRow category={expenseCategory} handleChangeIsDefault={props.handleChangeIsDefaultExpense} handleDeleteCategory={props.handleDeleteExpense} key={expenseCategory.name} />
                )}
            </form>
            <button onClick={handleAddCategory} type='button'>+</button>
        </div>
    );
}

export default CategoriesForm;