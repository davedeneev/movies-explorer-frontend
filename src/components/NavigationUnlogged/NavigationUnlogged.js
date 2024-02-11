import React from "react";
import { Link } from 'react-router-dom';

function NavigationUnlogged() {
    return(
        <>
            <div className="header__links">
                <Link to="/signup" className="header__auth">Регистрация</Link>
                <Link to="/signin" className="header__auth header__login">Войти</Link>
            </div>
        </>
    )
}

export default NavigationUnlogged;
