import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as mainApi from "../../utils/MainApi";
import { useFormWithValidation } from '../../utils/formValidation';


function Register({ setLoggedIn }) {
    const { values, errors, handleChange, reset } = useFormWithValidation();
    const errorClassName = (name) => `authorization__error ${errors[name] ? 'authorization__error_visible' : ''}`
    const [isValid, setIsValid] = useState(false);
    const [regError, setRegError] = useState('');
    const handleFormValid = useCallback((event) => {
        setIsValid(event.target.closest('form').checkValidity());
    }, []);
    const navigate = useNavigate();

    useEffect(() => reset({}, {}, false), []);

    function handleSubmit(e) {
        e.preventDefault();

        handleRegister(values);
    }

    const handleChangeWithReset = (e) => {
        setRegError('');
        handleChange(e);
    };

    function handleLogin(data) {
        mainApi.authorize(data)
            .then((res) => {
                if(res.message) {
                    console.log(res.message)
                } else {
                    if (res.token) {
                        localStorage.setItem("jwt", res.token);
                        setLoggedIn(true);
                        navigate('/movies');
                    }
                }
            })
            .catch((err) => {
                console.log({err});
            })
    }

    function handleRegister(formData) {
        mainApi.register(formData)
            .then((res) =>  {
                if(res.message) {
                    setRegError(res.message);
                } else {
                    handleLogin({'email': formData.email, 'password': formData.password});
                }
            })
            .catch((err) => {
                console.log({err});
            });
    }

    return(
        <main className="auth">
            <section className="authorization">
                <h2 className="authorization__title">Добро пожаловать!</h2>
                <form className="authorization__form" onChange={handleFormValid} onSubmit={handleSubmit}>
                    <div className="authorization__wrapper">
                        <label className="authorization__label" htmlFor="username" title="Имя">Имя</label>
                        <input className="authorization__input"
                               name="name"
                               type="text"
                               id="username"
                               value={values.name || ''}
                               onChange={handleChangeWithReset}
                               pattern="^[a-zA-Zа-яА-ЯёЁ\s\-]+$"
                               minLength="2"
                               maxLength="30"
                               required/>
                        <span className={errorClassName('name')}>{errors['name']}</span>
                    </div>
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
                        className={`authorization__server-error ${regError? 'authorization__server-error_visible' : ''}`}
                    >{regError}</span>
                    <button
                        type="submit"
                        className={`authorization__button ${isValid ? '' : 'authorization__button_disabled'} `}>
                        Зарегистрироваться
                    </button>
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
