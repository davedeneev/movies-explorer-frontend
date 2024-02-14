import React from 'react';
import { useNavigate } from 'react-router-dom';

function PageNotFound() {
    const backPage = useNavigate();

    function handleClickBack() {
        backPage(-1);
    }

    return (
        <main className="content">
            <div className="not-exist-page">
                <h1 className="not-exist-page__code">404</h1>
                <span className="not-exist-page__text">Страница не найдена</span>
                <button className="not-exist-page__link" onClick={handleClickBack} type='button'>Назад</button>
            </div>
        </main>
    );
}

export default PageNotFound;