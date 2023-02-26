import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';

import homeIcon from '../../media/images/icons/home_icon.png';
import LogoutButton from '../logoutButton/LogoutButton';


function Navbar(props) {

    const navigate = useNavigate();

    const [activeLink, setActiveLink] = useState('');

    useEffect(() => {
        if (props.isLoggedIn === false) {
            navigate('../login');
        }
    }, [navigate]);

    useEffect(() => {
        setActiveLink(window.location.pathname.substring(1));
    }, [navigate])

    const getNavlinkClass = function(linkName) {
        if (props.isLoggedIn === false) {
            return 'navbar-link navbar-link-inactive';
        }
        if (linkName === activeLink) {
            return 'navbar-link navbar-link-active';
        }
        return 'navbar-link navbar-link-inactive';
    }

    const handleLogout = (e) => {
        props.handleLogout(e);
        navigate('../login');
    }

    const getSessionLink = function() {
        if (props.isLoggedIn === true) {
            return(
                <LogoutButton MOBILE_WIDTH={props.MOBILE_WIDTH} width={props.width} handleLogout={handleLogout} />
            );
        }
        return(
            <NavLink className={getNavlinkClass('login')} to='/login'>{getLinkLogin()}</NavLink>
        );
    }

    const getLinkLogin = function() {
        return (
            <>
                <i className="fa-solid fa-arrow-right-to-bracket"></i>
                <span className='navlink-text'>Log In</span>
            </>
        );
    }

    const getLinkDetail = function() {
      return (
        <>
          <i className="fa-solid fa-magnifying-glass"></i>
          <span className='navlink-text'>Detail</span>
        </>
      );
    }

    const getLinkReport = function() {
        return (
            <>
                <i className="fa-solid fa-plus"></i>
                <span className='navlink-text'>Create</span>
            </>
        );
    }

    const getLinkSummary = function() {
        return (
            <>
                <i className="fa-solid fa-calendar-days"></i>
                <span className='navlink-text'>Browse</span>
            </>
        );
    }

    const getLinkSettings = function() {
        return (
            <>
                <i className="fa-solid fa-sliders"></i>
                <span className='navlink-text'>Settings</span>
            </>
        );
    }

    return(
        <nav id='navbar'>
            <ul>
                <li><NavLink className={getNavlinkClass('browse')} to='/browse'>{getLinkSummary()}</NavLink></li>
                <li><NavLink className={getNavlinkClass('detail')} to='/detail'>{getLinkDetail()}</NavLink></li>
                <li><NavLink className={getNavlinkClass('report')} to='/report'>{getLinkReport()}</NavLink></li>
                <li><NavLink className={getNavlinkClass('settings')} to='/settings'>{getLinkSettings()}</NavLink></li>
                <li>{getSessionLink()}</li>
            </ul>
        </nav>
    );
}

export default Navbar;