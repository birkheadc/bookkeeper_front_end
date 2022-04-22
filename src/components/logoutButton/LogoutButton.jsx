import React from 'react';
import './LogoutButton.css'

function LogoutButton(props) {
    return(
        <button onClick={props.handleLogout} type='button'>Log Out</button>
    );
}

export default LogoutButton;