import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../utils/CurrentUserContext';

function Profile() {
    const navigate = useNavigate();
    const userData = useContext(UserContext);
    const [userName, setUserName] = useState(userData.userName);
    const [userEmail, setUserEmail] = useState(userData.userEmail);

    function handleProfileFormSubmit(e) {
        e.preventDefault();
    }

    function handleChangeName(e) {
        setUserName(e.target.value);
    }

    function handleChangeEmail(e) {
        setUserEmail(e.target.value);
    }

    function handleLogOut() {
        navigate('/');
    }

    return (
        <main className="content">
            <section className="profile">
                <h2 className="profile__greeting">Привет, {userData.userName}!</h2>
                <form
                    name="profile-form"
                    className="profile__form"
                    action="#"
                    method="POST"
                    onSubmit={handleProfileFormSubmit} noValidate>
                    <div className="profile__form-input-wrapper">
                        <label className="profile__form-label">Имя</label>
                        <input
                            name="profile-name"
                            type="text"
                            id="input-profile-name"
                            className="profile__form-input profile__form-input_uneditable"
                            minLength="2"
                            maxLength="40"
                            value={userName}
                            onChange={handleChangeName}
                            required />
                    </div>
                    <div className="profile__form-input-wrapper">
                        <label className="profile__form-label">E-mail</label>
                        <input
                            name="profile-email"
                            type="email"
                            id="input-profile-email"
                            className="profile__form-input profile__form-input_uneditable"
                            minLength="2"
                            maxLength="60"
                            value={userEmail}
                            onChange={handleChangeEmail}
                            required />
                    </div>
                    <div className="profile__settings">
                        <button className="profile__edit">Редактировать</button>
                        <button className="profile__edit profile__logout" onClick={handleLogOut}>Выйти из аккаунта</button>
                    </div>
                </form>
            </section>
        </main>
    );
}

export default Profile;