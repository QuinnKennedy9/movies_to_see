import React from "react";
import './Header.scss';


const Header = ({logout}) => {
    return (
        <div className='header-container'>
            <span onClick={logout}>Logout</span>
        </div>
    );
}

export default Header;