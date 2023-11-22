import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js'
import MoviesCardList from '../MoviesCardList/MoviesCardList.js'
import Preloader from '../Preloader/Preloader.js'
import Footer from "../Footer/Footer.js";
import moviesCardList from "../../utils/moviesList.js";

function Movies() {
    const isLoading = false; //заглушка для проверки работы прелоудера на этом этапе

    return (
        <>
            <main className="content">
                <SearchForm />
                {isLoading && <Preloader />}
                <MoviesCardList movies={moviesCardList} buttonType={"like"} />
            </main>
            <Footer/>
        </>
    );
}

export default Movies;