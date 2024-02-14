import React, { useState, useEffect } from "react";
import Preloader from '../Preloader/Preloader';
import {getMovies} from "../../utils/MoviesApi";
import { NO_RESULT_ERROR, EMPTY_QUERY_ERROR, SEARCH_SERVER_ERROR, SHORT_FILM_DURATION_LIMIT } from "../../utils/constants";

function SearchForm(props) {
    const [isInputValid, setIsInputValid] = useState(props.searchType === 'all');
    const [searchQuery, setSearchQuery] = useState(props.searchType === 'all' ? (localStorage.getItem('searchMoviesQuery') || '') : '');
    const [searchInputError, setSearchInputError] = useState('');
    const [searchError, setSearchError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isShortFilmChecked, setIsShortFilmChecked] = useState(props.searchType === 'all' ? (localStorage.getItem('shortFilmCheckedButton') === 'true') : false);
    const errorClassName = `search-film__input-error ${(!isInputValid && searchInputError) ? 'search-film__input-error_visible' : ''}`
    const [isSearchInputBlocked, setIsSearchInputBlocked] = useState(false);

    useEffect(() => {
        if (props.searchType === 'all') {
            if (searchQuery) {
                displayMovie();
            }
        } else if (props.searchType === 'saved') {
            displayMovie();
        }
    }, [isShortFilmChecked]);

    function handleTumblerClick() {
        const newCheckedState = !isShortFilmChecked;

        setIsShortFilmChecked(newCheckedState);

        if (props.searchType === 'all') {
            localStorage.setItem('shortFilmCheckedButton', newCheckedState);
        }
    }

    function getSearchResult(movies) {
        let filteredMovies = movies.filter(movie =>
            movie.nameRU.toLowerCase().includes(searchQuery.toLowerCase()));

        if (filteredMovies.length === 0) {
            setSearchError(NO_RESULT_ERROR);
        }

        if (props.searchType === 'all') {
            localStorage.setItem('searchMoviesQuery', searchQuery);
        }

        if(isShortFilmChecked) {
            filteredMovies = filteredMovies.filter(movie => movie.duration <= SHORT_FILM_DURATION_LIMIT)
            if (filteredMovies.length === 0) {
                setSearchError(NO_RESULT_ERROR);
            }
        }

        return filteredMovies;
    }

    function displayMovie() {
        setSearchError('');

        if (!isInputValid && props.searchType === 'all') {
            setSearchInputError(EMPTY_QUERY_ERROR);
            return;
        }

        if (props.searchType === 'all') {
            const localMoviesList = localStorage.getItem('localMoviesList');

            if (localMoviesList === null) {

                setIsLoading(true);
                setIsSearchInputBlocked(true);

                getMovies()
                    .then((movies) => {
                        localStorage.setItem('localMoviesList', JSON.stringify(movies));
                        props.displaySearchResult(getSearchResult(movies));
                    })
                    .catch(() => {
                        setSearchError(SEARCH_SERVER_ERROR);
                    })
                    .finally(() => {
                        setIsLoading(false);
                        setIsSearchInputBlocked(false);
                    });
            } else {
                props.displaySearchResult(getSearchResult(JSON.parse(localMoviesList)));
            }
        } else if (props.searchType === 'saved'){
            const localSavedMovies = JSON.parse(localStorage.getItem('localSavedMovies'));
            props.displaySearchResult(getSearchResult(localSavedMovies));
        }

    }

    function handleSubmit(event) {
        event.preventDefault();
        displayMovie();
    }

    function handleChangeSearchInput(e) {
        const searchData = e.target.value;
        setSearchQuery(searchData);

        if (!searchData.trim()) {
            setIsInputValid(false);
        } else {
            setIsInputValid(true);
            setSearchInputError('');
        }
    }
    return (
        <section className="search-film">
            <form className="search-film__form" onSubmit={handleSubmit} noValidate>
                <div className="search-film__container">
                    <input
                        type="text"
                        name="inputFilmSearch"
                        className="search-film__input"
                        placeholder="Фильм"
                        onChange={handleChangeSearchInput}
                        value={searchQuery}
                        disabled={isSearchInputBlocked}
                        required
                    />
                    <button className="search-film__button-submit" disabled={isSearchInputBlocked}></button>
                </div>
                <span className={errorClassName}>{searchInputError}</span>
                <div className="search-film__wrapper">
                    <input type="checkbox" id="short-films-toggle" onClick={handleTumblerClick} defaultChecked={isShortFilmChecked} className="search-film__toggle" />
                    <p className="search-film__desc">Короткометражки</p>
                </div>
            </form>
            {isLoading && (<Preloader />)}
            {searchError && (<p className='search-film__input-error search-film__input-error_visible'>{searchError}</p>)}
        </section>
    );
}

export default SearchForm;