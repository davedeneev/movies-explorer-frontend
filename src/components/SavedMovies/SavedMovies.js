import React, {useState} from 'react';
import SearchForm from '../SearchForm/SearchForm.js'
import MoviesCardList from '../MoviesCardList/MoviesCardList.js'
import Footer from "../Footer/Footer.js";

function SavedMovies() {
    const [moviesList, setMoviesList] = useState([]);

    function handleMoviesSearch(movies) {
        setMoviesList(movies);
    }

    return (
        <>
            <main className="content">
                <SearchForm displaySearchResult={handleMoviesSearch} moviesList={moviesList} searchType="saved" />
                <MoviesCardList moviesList={moviesList} setMoviesList={setMoviesList} searchType="saved" buttonType={"delete"} />
            </main>
            <Footer/>
        </>
    );
}

export default SavedMovies;