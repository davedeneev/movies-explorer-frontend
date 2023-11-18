import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
    return (
        <div className="not-exist-page">
            <h1 className="not-exist-page__code">404</h1>
            <span className="not-exist-page__text">Страница не найдена</span>
            <Link to="/" className="not-exist-page__link">Назад</Link>
        </div>
    );
}

export default PageNotFound;