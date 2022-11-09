import React from 'react';
import './LogoutButton.css'

import logOutIcon from '../../media/images/icons/log_out_b_icon.png';

function LogoutButton(props) {

    const getLink = function() {
        return (
            <>
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <span className='navlink-text'>Log Out</span>
            </>
        );
    }

    return(
        <a className={'navbar-link navbar-link-inactive'} href="" onClick={props.handleLogout}>{getLink()}</a>
    );
}

export default LogoutButton;