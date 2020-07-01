import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import Preloader from './../common/Preloader/Preloader'

const Header = (props) => {
    debugger
    return <header className={s.header}>
        <img src="https://s1.logaster.com/static/v3/img/products/logo.png"></img>
        <div className={s.login}>
            {props.isFetching ? <Preloader/> : props.isAuth ? props.login : <NavLink to="/login">Login</NavLink> }
        </div>
    </header>;
}

export default Header;