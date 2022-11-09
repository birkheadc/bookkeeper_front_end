import React from 'react';
import './CategoriesForm.css'
import CategoriesFormRow from './CategoriesFormRow';

function CategoriesForm(props) {

    const handleAddEarning = () => {
        props.handleAddEarning();
    }

    const handleAddExpense = () => {
        props.handleAddExpense();
    }

    return(
        <div className='settings-sub-section-wrapper'>
            <h2>Transaction Categories</h2>
            <hr></hr>
            <form className='categories-form'>
                <div className='categories-form-sub-section'>
                    <h3>Earnings</h3>
                    <div className='categories-form-categories-wrapper'>
                        {props.settings.earningCategories.map(
                            earningCategory =>
                            <CategoriesFormRow category={earningCategory} handleChangeIsDefault={props.handleChangeIsDefaultEarning} handleDeleteCategory={props.handleDeleteEarning} key={earningCategory.name} />
                        )}
                    </div>
                    <div className='settings-button-wrapper'>
                        <button onClick={handleAddEarning} type='button'>+</button>
                    </div>
                </div>
                <div className='categories-form-sub-section'>
                    <h3>Expenses</h3>
                    <div className='categories-form-categories-wrapper'>
                    {props.settings.expenseCategories.map(
                        expenseCategory =>
                        <CategoriesFormRow category={expenseCategory} handleChangeIsDefault={props.handleChangeIsDefaultExpense} handleDeleteCategory={props.handleDeleteExpense} key={expenseCategory.name} />
                    )}
                    </div>
                    <div className='settings-button-wrapper'>
                        <button onClick={handleAddExpense} type='button'>+</button>
                    </div>
                </div>
            </form>
            
        </div>
    );
}

export default CategoriesForm;