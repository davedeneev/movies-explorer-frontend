import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js'
import {saveMovie, deleteMovie} from "../../utils/MainApi";

function MoviesCardList(props) {
    const [moviesCardAmount, setMoviesCardAmount] = useState(getCardsAmount().defaultCardsAmount);

    function getCardsAmount() {
        const currentScreenWidth = window.innerWidth;

        if (props.searchType === 'saved') {
            const allMovies = JSON.parse(localStorage.getItem('localSavedMovies')).length;
            return {defaultCardsAmount: allMovies}
        } else if(currentScreenWidth >= 1280) {
            return {defaultCardsAmount: 12, loadMoreButton: 3};
        } else if(currentScreenWidth >= 768) {
            return {defaultCardsAmount: 8, loadMoreButton: 2};
        } else {
            return {defaultCardsAmount: 5, loadMoreButton: 2};
        }
    }

    useEffect(() => {
        function handleResizeScreen () {
            const cardsAmount = getCardsAmount();
            setMoviesCardAmount(cardsAmount.defaultCardsAmount);
        }

        window.addEventListener('resize', handleResizeScreen);

        return () => { window.removeEventListener('resize', handleResizeScreen);};
        }, []);

    function handleShowMoreMovies() {
        setMoviesCardAmount((amount) => amount + getCardsAmount().loadMoreButton);
    }

    function saveMovieCard(movieId) {
        const selectedMovie = props.moviesList.find((movie) => movie.id === movieId);
        const movieToSave = {
            country: selectedMovie.country,
            director: selectedMovie.director,
            duration: selectedMovie.duration,
            year: selectedMovie.year,
            description: selectedMovie.description,
            image: `https://api.nomoreparties.co/${selectedMovie.image.url}`,
            trailerLink: selectedMovie.trailerLink,
            thumbnail: `https://api.nomoreparties.co/${selectedMovie.image.url}`,
            movieId: selectedMovie.id,
            nameRU: selectedMovie.nameRU,
            nameEN: selectedMovie.nameEN,
        };

        saveMovie(movieToSave)
            .then(movie => {
                const localSavedMovies = JSON.parse(localStorage.getItem('localSavedMovies'));
                const updatedSavedMovies = [...localSavedMovies, movie];

                localStorage.setItem('localSavedMovies', JSON.stringify(updatedSavedMovies));
            })
            .catch((err) => {
                console.log({err});
            })
    }

    function deleteMovieCard(movieId) {
        deleteMovie(movieId)
            .then(() => {
                props.setMoviesList(movies => movies.filter(movie => movie._id !== movieId));
                const localSavedMovies = JSON.parse(localStorage.getItem('localSavedMovies'));
                const updatedSavedMovies = localSavedMovies.filter(movie => movie._id !== movieId);
                localStorage.setItem('localSavedMovies', JSON.stringify(updatedSavedMovies));

            })
            .catch(err => console.log(err));
    }

    return(
        <section className="movies-card-container">
            <div className="movies-card-container__list">
                {props.moviesList.slice(0, moviesCardAmount).map((movie) => (
                    <MoviesCard
                        key={movie.id ? movie.id : movie._id}
                        movieCardId={movie.id? movie.id : movie._id}
                        nameRU={movie.nameRU}
                        image={movie.image.url ? `https://api.nomoreparties.co/${movie.image.url}` : `${movie.image}`}
                        trailerLink={movie.trailerLink}
                        duration={movie.duration}
                        buttonType={props.buttonType}
                        saveMovieCard={saveMovieCard}
                        deleteMovieCard={deleteMovieCard}
                    />
                ))}
            </div>
            { moviesCardAmount < props.moviesList.length && props.searchType === 'all' && (
                <button
                    className="movies-card-container__more-button"
                    onClick={handleShowMoreMovies}
                >
                    Ещё
                </button>)
            }
        </section>
    );
}

export default MoviesCardList;