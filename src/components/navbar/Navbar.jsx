import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar(props) {
    return(
        <nav>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/report'>Create Report</NavLink></li>
                <li><NavLink to='/settings'>Settings</NavLink></li>
                <li><NavLink to='/login'>Login</NavLink></li>
                <li><NavLink to='/summary'>Summary</NavLink></li>
            </ul>
        </nav>
    );
}

export default Navbar;