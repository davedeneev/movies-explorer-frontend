import React from 'react';

function SearchForm() {
    return (
        <section className="search-film">
            <form className="search-film__form" noValidate>
                <div className="search-film__container">
                    <input className="search-film__input" placeholder="Фильм" required></input>
                    <button className="search-film__button-submit"></button>
                </div>
                <div className="search-film__wrapper">
                    <input type="checkbox" id="short-films-toggle" className="search-film__toggle" />
                    <p className="search-film__desc">Короткометражки</p>
                </div>
            </form>
        </section>
    );
}

export default SearchForm;