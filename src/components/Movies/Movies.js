import React, {useState}  from 'react';
import SearchForm from '../SearchForm/SearchForm.js'
import MoviesCardList from '../MoviesCardList/MoviesCardList.js'
import Footer from "../Footer/Footer.js";

function Movies() {
    const [moviesList, setMoviesList] = useState([]);

    function handleMoviesSearch(movies) {
        setMoviesList(movies);
    }

    return (
        <>
            <main className="content">
                <SearchForm displaySearchResult={handleMoviesSearch} moviesList={moviesList} searchType="all"/>
                <MoviesCardList moviesList={moviesList} searchType="all" buttonType={"like"} />
            </main>
            <Footer/>
        </>
    );
}

export default Movies;