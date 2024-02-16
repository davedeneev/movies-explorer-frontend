import React, {useState, useEffect} from "react";

function MoviesCard(props) {
    const [isMovieSaved, setIsMovieSaved] = useState(false);

    useEffect(() => {
        if(props.buttonType === 'like') {
            const savedMovies = JSON.parse(localStorage.getItem('localSavedMovies'));
            if (savedMovies) {
                const isAlreadySaved = savedMovies.some(movie => movie.movieId === props.movieCardId);
                setIsMovieSaved(isAlreadySaved);
            }
        }
    }, []);

    function handleClickSaveMovie(movieId) {
        let localSavedMovies = JSON.parse(localStorage.getItem('localSavedMovies'));
        let savedMovie = localSavedMovies.find(movie => movie.movieId === movieId);

        if(isMovieSaved) {
            props.deleteMovieCard(savedMovie._id, setIsMovieSaved);
        } else {
            props.saveMovieCard(movieId, setIsMovieSaved);
        }
    }

    function handleClickDeleteMovie(movieId) {
        props.deleteMovieCard(movieId, setIsMovieSaved);
    }

    return(
        <div className="movies-card">
            <a target="_blank" href={props.trailerLink}>
                <img className="movies-card__img" src={props.image} alt={props.nameRU} />
            </a>
            <div className="movies-card__info">
                <div className="movies-card__desc">
                    <h2 className="movies-card__title">{props.nameRU}</h2>
                    <p className="movies-card__duration">{Math.trunc(props.duration / 60) + 'ч '
                        + props.duration % 60 + 'м'}</p>
                </div>
                {props.buttonType === 'like' ?
                    (<button
                        type="button"
                        className={`movies-card__button movies-card__button-save ${isMovieSaved ?
                            'movies-card__button-save_active' : ''}`}
                        onClick={() => handleClickSaveMovie(props.movieCardId)}></button>)
                    : (<button
                        type="button"
                        className="movies-card__button movies-card__button-delete"
                        onClick={() => handleClickDeleteMovie(props.movieCardId)}></button>)
                }
            </div>
        </div>
    );
}

export default MoviesCard;
