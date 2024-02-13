import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../utils/CurrentUserContext';
import { useFormWithValidation } from '../../utils/formValidation';
import * as mainApi from "../../utils/MainApi";
import { PROFILE_VALID_ERROR, SUCCESS_PROFILE_EDIT } from '../../utils/constants';

function Profile({ setLoggedIn, setCurrentUser }) {
    const navigate = useNavigate();
    const currentUser = useContext(UserContext);
    const { values, handleChange, setValue, isValid } = useFormWithValidation();
    const [userName, setUserName] = useState(currentUser.name);
    const [userEmail, setUserEmail] = useState(currentUser.email);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isFormModified, setIsFormModified] = useState(false);
    const [profileEditError, setProfileEditError] = useState('');

    useEffect(() => {
        setValue("userName", currentUser.name);
        setValue("userEmail", currentUser.email);
    },[]);

    useEffect(() => {
        const isNameChanged = userName !== currentUser.name;
        const isEmailChanged = userEmail !== currentUser.email;
        if (!isValid && isFormModified) {
            setProfileEditError(PROFILE_VALID_ERROR);
        }
        setIsFormModified(isNameChanged || isEmailChanged);
    }, [userName, userEmail, isValid, currentUser]);

    function handleProfileFormSubmit(e) {
        e.preventDefault();

        mainApi.changeUserData(values['userName'], values['userEmail'])
            .then((data) => {
                if(!data.message) {
                    setCurrentUser(data);
                    setProfileEditError(SUCCESS_PROFILE_EDIT);
                } else {
                    setProfileEditError(data.message);
                }
            })
            .catch((err) => {
                console.log({err});
            })
            .finally(() => {
                setIsEditMode(false);
            });
    }

    function handleEnterEditMode() {
        setIsEditMode(true);
    }

    function handleProfileChange(e) {
        const { name, value } = e.target;

        setProfileEditError('');
        handleChange(e);
        if (name === 'userName') {
            setUserName(value);
        } else if (name === 'userEmail') {
            setUserEmail(value);
        }
    }

    function handleLogOut() {
        localStorage.clear();
        setLoggedIn(false);
        navigate('/');
    }

    return (
        <main className="content">
            <section className="profile">
                <h2 className="profile__greeting">Привет, {currentUser.name}!</h2>
                <form
                    name="profile-form"
                    className="profile__form"
                    action="#"
                    method="POST"
                    onSubmit={handleProfileFormSubmit} noValidate>
                    <div className="profile__form-input-wrapper">
                        <label className="profile__form-label">Имя</label>
                        <input
                            name='userName'
                            type="text"
                            id="input-profile-name"
                            className="profile__form-input"
                            minLength="2"
                            maxLength="40"
                            value={userName}
                            disabled={!isEditMode}
                            onChange={(e) => { handleProfileChange(e) }}
                            required />
                    </div>
                    <div className="profile__form-input-wrapper">
                        <label className="profile__form-label">E-mail</label>
                        <input
                            name='userEmail'
                            type="email"
                            id="input-profile-email"
                            className="profile__form-input"
                            minLength="2"
                            maxLength="60"
                            value={userEmail}
                            pattern="^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,4}$"
                            disabled={!isEditMode}
                            onChange={(e) => { handleProfileChange(e) }}
                            required />
                    </div>
                    <div className="profile__settings">
                        <span className="profile__submit-error">{profileEditError}</span>
                        {isEditMode ? (
                            <>
                                <button
                                    className={`profile__submit ${
                                        isFormModified && isValid ? 'profile__submit_active' : ''}`}
                                    type="submit"
                                    disabled={!isFormModified || !isValid}
                                >
                                    Сохранить
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    className="profile__edit"
                                    type="button"
                                    onClick={handleEnterEditMode}
                                >
                                    Редактировать
                                </button>
                                <button
                                    className="profile__edit profile__logout"
                                    onClick={handleLogOut}
                                >
                                    Выйти из аккаунта
                                </button>
                            </>
                        )}
                    </div>
                </form>
            </section>
        </main>
    );
}

export default Profile;
