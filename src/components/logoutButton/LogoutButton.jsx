import React from 'react';
import './LogoutButton.css'

import logOutIcon from '../../media/images/icons/log_out_b_icon.png';

function LogoutButton(props) {

    const getLink = function() {
        if (props.width < props.MOBILE_WIDTH) {
            return <img src={logOutIcon} width={20}></img>;
        }
        return 'Log Out';
    }

    return(
        <a className={'navbar-link-inactive'} href="" onClick={props.handleLogout}>{getLink()}</a>
    );
}

export default LogoutButton;