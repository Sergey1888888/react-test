import React from 'react';
import s from './Header.module.css';
import { NavLink } from 'react-router-dom';
import Preloader from './../common/Preloader/Preloader'

const Header = (props) => {
    return <header className={s.header}>
        <img src="https://s1.logaster.com/static/v3/img/products/logo.png"></img>
        <div className={s.login}>
            {props.isFetching ? <Preloader/> : props.isAuth ? <div>{props.login} - <button className="btn" onClick={props.Logout}>Log out</button></div> : <NavLink to="/login">Login</NavLink> }
        </div>
    </header>;
}

export default Header;