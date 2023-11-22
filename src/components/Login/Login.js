import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
    return(
        <main className="auth">
            <section class="authorization">
                <h2 class="authorization__title">Рады видеть!</h2>
                <form class="authorization__form">
                    <div class="authorization__wrapper">
                        <label className="authorization__label" title="E-mail">E-mail</label>
                        <input class="authorization__input"
                               name="email"
                               type="email"
                               id="email"
                               required/>
                        <span class="authorization__error">Что-то пошло не так...</span>
                    </div>
                    <div class="authorization__wrapper">
                        <label className="authorization__label" title="Пароль">Пароль</label>
                        <input class="authorization__input"
                               name="password"
                               type="password"
                               id="password"
                               required/>
                        <span class="authorization__error">Что-то пошло не так...</span>
                    </div>
                    <button type="submit" class="authorization__button">Войти</button>
                </form>
                <div className="authorization__check-wrapper">
                    <span className="authorization__check-text">Ещё не зарегистрированы?</span>
                    <Link to="/signup" className="authorization__check-link">Регистрация</Link>
                </div>
            </section>
        </main>
    );
}

export default Login;