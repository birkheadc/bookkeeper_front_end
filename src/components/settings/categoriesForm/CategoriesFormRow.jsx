import React from 'react';

function CategoriesFormRow(props) {

    const handleChangeIsDefault = (e) => {
        const name = e.target.getAttribute('data-name');
        const isDefault = e.target.checked;
        props.handleChangeIsDefault(name, isDefault);
    }

    const handleDeleteCategory = (e) => {
        const name = e.target.getAttribute('data-name');
        props.handleDeleteCategory(name)
    }

    return(
        <div>
            <label htmlFor={'category-checkbox_' + props.category.name}>{props.category.name}</label>
            <input data-name={props.category.name} id={'category-checkbox_' + props.category.name} onChange={handleChangeIsDefault} type='checkbox' checked={props.category.isDefault}></input>
            <button data-name={props.category.name} onClick={handleDeleteCategory} type='button'>x</button>
        </div>
    );
}

export default CategoriesFormRow;