import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../logoutButton/LogoutButton';
import './Navbar.css';

function Navbar(props) {

    const getSessionLink = function() {
        if (props.isLoggedIn === true) {
            return(
                props.logoutButton
            );
        }
        return(
            <NavLink to='/login'>Login</NavLink>
        );
    }

    return(
        <nav>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/report'>Create Report</NavLink></li>
                <li><NavLink to='/settings'>Settings</NavLink></li>
                <li><NavLink to='/summary'>Summary</NavLink></li>
                <li>{getSessionLink()}</li>
            </ul>
        </nav>
    );
}

export default Navbar;