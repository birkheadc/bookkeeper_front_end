import React from 'react';
import './Login.css';

function Login(props) {
    return(
        <div>
            <h1>Please log in</h1>
            <form>
                <div>
                    <label>Password</label>
                    <input type='text'></input>
                </div>
                <button type='button'>Login</button>
            </form>
        </div>
    );
}

export default Login;