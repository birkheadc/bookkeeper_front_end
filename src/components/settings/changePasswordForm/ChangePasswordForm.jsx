import React from 'react';
import './ChangePasswordForm.css'

function ChangePasswordForm(props) {

    const handleSubmitChangePassword = (e) => {
        e.preventDefault();
        const oldPassword = document.getElementById('password-change-old-password').value;
        const newPassword = document.getElementById('password-change-new-password').value;
        props.handleChangePassword(oldPassword, newPassword);
    }

    return(
        <div className='settings-section-wrapper'>
            <div className='settings-sub-section-wrapper'>
                <h2>Change Password</h2>
                <form className='categories-form' onSubmit={handleSubmitChangePassword}>
                    <div className='categories-form-row'>
                        <label htmlFor='password-change-old-password'>Old Password</label>
                        <input id='password-change-old-password' type='password'></input>
                    </div>
                    <div className='categories-form-row'>
                        <label htmlFor='password-change-new-password'>New Password</label>
                        <input id='password-change-new-password' type='password'></input>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default ChangePasswordForm;