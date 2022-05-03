import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

import homeIcon from '../../media/images/icons/home_icon.png';
import createReportIcon from '../../media/images/icons/plus_icon.png';
import logInIcon from '../../media/images/icons/log_in_b_icon.png';
import settingsIcon from '../../media/images/icons/cog_wheel_icon.png';
import summaryIcon from '../../media/images/icons/search_icon.png';


function Navbar(props) {

    const navigate = useNavigate();

    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        setActiveLink(window.location.pathname.substring(1));
    }, [navigate])

    const getNavlinkClass = function(linkName) {
        if (props.isLoggedIn === false) {
            return 'navbar-link-inactive';
        }
        if (linkName === activeLink) {
            return 'navbar-link-active';
        }
        return 'navbar-link-inactive';
    }

    const getSessionLink = function() {
        if (props.isLoggedIn === true) {
            return(
                props.logoutButton
            );
        }
        return(
            <NavLink className={getNavlinkClass('login')} to='/login'>{getLinkLogin()}</NavLink>
        );
    }

    const getLinkLogin = function() {
        if (props.width < props.MOBILE_WIDTH) {
            return <img src={logInIcon} width={20}></img>;
        }
        return 'Log In';
    }

    const getLinkHome = function() {
        if (props.width < props.MOBILE_WIDTH) {
            return <img src={homeIcon} width={20}></img>;
        }
        return 'Home';
    }

    const getLinkReport = function() {
        if (props.width < props.MOBILE_WIDTH) {
            return <img src={createReportIcon} width={20}></img>;
        }
        return 'Create Report';
    }

    const getLinkSummary = function() {
        if (props.width < props.MOBILE_WIDTH) {
            return <img src={summaryIcon} width={20}></img>;
        }
        return 'Summary';
    }

    const getLinkSettings = function() {
        if (props.width < props.MOBILE_WIDTH) {
            return <img src={settingsIcon} width={20}></img>;
        }
        return 'Settings'
    }

    return(
        <nav id='navbar'>
            <ul>
                <li><NavLink className={getNavlinkClass('')} to='/'>{getLinkHome()}</NavLink></li>
                <li><NavLink className={getNavlinkClass('report')} to='/report'>{getLinkReport()}</NavLink></li>
                <li><NavLink className={getNavlinkClass('summary')} to='/summary'>{getLinkSummary()}</NavLink></li>
                <li><NavLink className={getNavlinkClass('settings')} to='/settings'>{getLinkSettings()}</NavLink></li>
                <li>{getSessionLink()}</li>
            </ul>
        </nav>
    );
}

export default Navbar;