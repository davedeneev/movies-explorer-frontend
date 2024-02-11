import React, {useState} from 'react';
import SearchForm from '../SearchForm/SearchForm.js'
import MoviesCardList from '../MoviesCardList/MoviesCardList.js'
import Footer from "../Footer/Footer.js";

function SavedMovies() {
    const [savedMoviesList, setSavedMoviesList] = useState([]);

    function handleMoviesSearch(movies) {
        setSavedMoviesList(movies);
    }

    return (
        <>
            <main className="content">
                <SearchForm displaySearchResult={handleMoviesSearch} moviesList={savedMoviesList} searchType="saved" />
                <MoviesCardList moviesList={savedMoviesList} setSavedMoviesList={setSavedMoviesList} searchType="saved" buttonType={"delete"} />
            </main>
            <Footer/>
        </>
    );
}

export default SavedMovies;