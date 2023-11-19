import React from 'react';
import { Link } from 'react-router-dom';

function Register() {

    return(
        <main className="auth">
            <section className="authorization">
                <h2 className="authorization__title">Добро пожаловать!</h2>
                <form className="authorization__form">
                    <div className="authorization__wrapper">
                        <label className="authorization__label" htmlFor="username" title="Имя">Имя</label>
                        <input className="authorization__input"
                               name="username"
                               type="text"
                               id="username"
                               required/>
                        <span className="authorization__error">Что-то пошло не так...</span>
                    </div>
                    <div className="authorization__wrapper">
                        <label className="authorization__label" htmlFor="email" title="E-mail">E-mail</label>
                        <input className="authorization__input"
                               name="email"
                               type="email"
                               id="email"
                               required/>
                        <span className="authorization__error">Что-то пошло не так...</span>
                    </div>
                    <div className="authorization__wrapper">
                        <label className="authorization__label" htmlFor="password" title="Пароль">Пароль</label>
                        <input className="authorization__input authorization__input_error"
                               name="password"
                               type="password"
                               id="password"
                               required/>
                        <span className="authorization__error authorization__error_visible">Что-то пошло не так...</span>
                    </div>
                    <button type="submit" className="authorization__button">Зарегистрироваться</button>
                </form>
                <div className="authorization__check-wrapper">
                    <span className="authorization__check-text">Уже зарегистрированы?</span>
                    <Link to="/signin" className="authorization__check-link">Войти</Link>
                </div>
            </section>
        </main>
    );
}

export default Register;