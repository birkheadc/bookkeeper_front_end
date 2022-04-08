import React, { useEffect, useState } from 'react';
import './Login.css';
import verifyPassword from '../../api/verifyPassword/VerifyPassword';
import { useNavigate } from 'react-router-dom';

function Login(props) {

    const [isLoggingIn, setLoggingIn] = useState();
    const [message, setMessage] = useState();
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoggingIn(true);

        let pwField = document.getElementById('password-field');
        let pw = pwField.value;
        pwField.value = "";

        let isCorrect = await verifyPassword(process.env.REACT_APP_BOOKKEEPER_URL, pw);

        if (isCorrect === false) {
            setLoggingIn(false);
            setMessage("Password incorrect");
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

    if (isLoggingIn === true) {
        return <h1>Logging in...</h1>
    }
    return(
        <div>
            <h1>Please log in</h1>
            {displayMessage()}
            <form>
                <div>
                    <label>Password</label>
                    <input id='password-field' type='password'></input>
                </div>
                <button onClick={handleLogin} type='button'>Login</button>
            </form>
        </div>
    );
}

export default Login;