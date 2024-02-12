import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as mainApi from "../../utils/MainApi";
import { useFormWithValidation } from '../../utils/formValidation';
import {getSavedMovies} from "../../utils/MainApi";

function Login({ setLoggedIn }) {
    const { values, errors, handleChange, reset } = useFormWithValidation();
    const errorClassName = (name) => `authorization__error ${errors[name] ? 'authorization__error_visible' : ''}`
    const [isValid, setIsValid] = useState(false);
    const [loginError, setLoginError] = useState('');
    const handleFormValid = useCallback((event) => {
        setIsValid(event.target.closest('form').checkValidity());
    }, []);
    const navigate = useNavigate();

    useEffect(() => reset({}, {}, false), []);

    function handleSubmit(e) {
        e.preventDefault();

        handleLogin(values);
    }

    function handleChangeWithReset(e) {
        setLoginError('');
        handleChange(e);
    }

    function handleLogin(data) {
        mainApi.authorize(data)
            .then((res) => {
                if(res.message) {
                    setLoginError(res.message);
                } else {
                    if (res.token) {
                        localStorage.setItem("jwt", res.token);
                        setLoggedIn(true);

                        const localSavedMovies = JSON.parse(localStorage.getItem('localSavedMovies'));

                        if(localSavedMovies === null) {
                            getSavedMovies()
                                .then(data => {
                                    localStorage.setItem('localSavedMovies', JSON.stringify(data));
                                })
                                .catch((err) => {
                                    console.log({err});
                                })
                        }
                        
                        navigate('/movies');
                    }
                }
            })
            .catch((err) => {
                console.log({err});
            })
    }

    return(
        <main className="auth">
            <section className="authorization">
                <h2 className="authorization__title">Рады видеть!</h2>
                <form className="authorization__form" onChange={handleFormValid} onSubmit={handleSubmit}>
                    <div className="authorization__wrapper">
                        <label className="authorization__label" htmlFor="email" title="E-mail">E-mail</label>
                        <input className="authorization__input"
                               name="email"
                               type="email"
                               id="email"
                               value={values.email || ''}
                               onChange={handleChangeWithReset}
                               pattern="^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$"
                               required/>
                        <span className={errorClassName('email')}>{errors['email']}</span>
                    </div>
                    <div className="authorization__wrapper">
                        <label className="authorization__label" htmlFor="password" title="Пароль">Пароль</label>
                        <input className={`authorization__input ${errors['password'] ? 'authorization__input_error' : ''}`}
                               name="password"
                               type="password"
                               id="password"
                               value={values.password || ''}
                               onChange={handleChangeWithReset}
                               minLength="2"
                               required/>
                        <span className={errorClassName('password')}>{errors['password']}</span>
                    </div>
                    <span
                        className={`authorization__server-error ${loginError? 'authorization__server-error_visible' : ''}`}
                    >{loginError}</span>
                    <button
                        type="submit"
                        className={`authorization__button ${isValid ? '' : 'authorization__button_disabled'} `}>
                        Войти</button>
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
