import React from "react";
import { Link, NavLink } from 'react-router-dom';

function Navigation() {

    function handleToggleBurgerMenu() {
        document.querySelector('.navigation__overlay').classList.toggle('navigation__overlay_closed');
    }

    return (
        <div className="navigation">
            <div className="navigation__high-res">
                <div className="navigation__menu">
                    <Link to="/movies" className="navigation__menu-link">Фильмы</Link>
                    <Link to="/saved-movies" className="navigation__menu-link">Сохранённые фильмы</Link>
                </div>
                <Link to="/profile" className="navigation__account">
                    Аккаунт
                    <div className="navigation__account-image"></div>
                </Link>
            </div>
            <div className="navigation__low-res">
                <button type="button" className="navigation__burger-button" onClick={handleToggleBurgerMenu}></button>
                <div className="navigation__overlay">
                    <div className="navigation__overlay-content">
                        <button className="navigation__overlay-close-button" onClick={handleToggleBurgerMenu}></button>
                        <div className="navigation__burger-menu">
                            <NavLink to="/" onClick={handleToggleBurgerMenu} className={({isActive}) => `${
                                    isActive ?
                                        'navigation__burger-navlink navigation__burger-navlink_active' :
                                        'navigation__burger-navlink'}`}>Главная</NavLink>
                            <NavLink to="/movies" onClick={handleToggleBurgerMenu} className={({isActive}) => `${
                                    isActive ?
                                        'navigation__burger-navlink navigation__burger-navlink_active' :
                                        'navigation__burger-navlink'}`}>Фильмы</NavLink>
                            <NavLink to="/saved-movies" onClick={handleToggleBurgerMenu} className={({isActive}) => `${
                                    isActive ?
                                        'navigation__burger-navlink navigation__burger-navlink_active' :
                                        'navigation__burger-navlink'}`}>Сохранённые фильмы</NavLink>
                        </div>
                        <Link to="/profile" onClick={handleToggleBurgerMenu} className="navigation__account">
                            Аккаунт
                            <div className="navigation__account-image"></div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navigation;