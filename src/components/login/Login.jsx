import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { Api } from '../../api';

function Login(props) {

    const [isLoggingIn, setLoggingIn] = useState();
    const [message, setMessage] = useState();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoggingIn(true);

        let pwField = document.getElementById('password-field');
        let pw = pwField.value;
        pwField.value = "";

        let isCorrect = await Api.verifyPassword(pw);

        if (isCorrect === 401) {
            setLoggingIn(false);
            setMessage("Password incorrect");
            return;
        }
        if (isCorrect === 404) {
            setLoggingIn(false);
            setMessage("Unable to connect to server");
            return;
        }
        props.handleLogin(pw);
        setLoggingIn(false);
        navigate('/');
    }

    const displayMessage = function() {
        if (message === undefined || message === null) {
            return null;
        }
        return(
            <h2>{message}</h2>
        );
    }

    function getDemoMessage() {
        if (process.env.REACT_APP_IS_DEMO === 'true') {
          return (
            <p>Password matching is disabled in the demo app. Just click Log In to proceed.</p>
          );
        }
    }

    if (isLoggingIn === true) {
        return <h1>Logging in...</h1>
    }
    return(
        <div className='section-wrapper login-wrapper'>
            <h1>Please log in</h1>
            {displayMessage()}
            <form onSubmit={handleLogin}>
                <div className='login-form-row'>
                    <label>Password</label>
                    <input id='password-field' type='password'></input>
                </div>
                <button onClick={handleLogin} type='submit'>Log In</button>
            </form>
            {getDemoMessage()}
        </div>
    );
}

export default Login;