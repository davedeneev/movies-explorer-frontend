import React, { useContext } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard.js'
import { UserContext } from '../../utils/CurrentUserContext';

function MoviesCardList(props) {
    const userData = useContext(UserContext);

    return(
        <section className="movies-card-container">
            <div className="movies-card-container__list">
                {props.movies.map((movie) => (
                    <MoviesCard
                        key={movie._id}
                        nameRU={movie.nameRU}
                        image={movie.image}
                        trailerLink={movie.trailerLink}
                        duration={movie.duration}
                        likes={movie.likes}
                        buttonType={props.buttonType}
                        userData={userData}
                    />
                ))}
            </div>
            <button className="movies-card-container__more-button">Ещё</button>
        </section>
    );
}

export default MoviesCardList;