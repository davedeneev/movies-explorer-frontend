import React from "react";
import { Route, Routes } from "react-router-dom";
import { Link } from 'react-router-dom';
import Navigation from "../Navigation/Navigation";
import NavigationUnlogged from "../NavigationUnlogged/NavigationUnlogged";

function Header() {
    const  isLogged = true; //заглушка для демонстрации изменения шапки в зависимости от статуса авторизации

    return(
        <Routes>
            <Route path="/signin" element={
                <header className="header header-unlogged">
                    <Link to="/" className="header__logo"></Link>
                </header>
            } />

            <Route path="/signup" element={
                <header className="header header-unlogged">
                    <Link to="/" className="header__logo"></Link>
                </header>
            } />

            <Route path="/" element={
                <header className="header header__background">
                    <Link to="/" className="header__logo"></Link>
                    {isLogged ? <Navigation /> : <NavigationUnlogged />}
                </header>
            } />

            <Route path="/page-not-found" element={
                <>
                </>
            } />

            <Route path="*" element={
                <header className="header">
                    <Link to="/" className="header__logo"></Link>
                    <Navigation />
                </header>
            } />
        </Routes>
    );
}

export default Header;
