import React from 'react';

function MoviesCardList(props) {

    function handleClickSaveMovie(e) {
        const cardButton = e.target;
        cardButton.classList.toggle('movies-card__button-save_active');
    }

    function handleClickDeleteMovie(e) {
        const cardButton = e.target;
        cardButton.closest('.movies-card').remove();
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
                    (props.likes.find((user) => user === props.userData.userId) ?
                            (<button
                                type="button"
                                className="movies-card__button movies-card__button-save movies-card__button-save_active"
                                onClick={handleClickSaveMovie}></button>)
                            : (<button
                                type="button"
                                className="movies-card__button movies-card__button-save"
                                onClick={handleClickSaveMovie}></button>)
                    )
                    : (props.likes.find((user) => user === props.userData.userId) ?
                            (<button
                                type="button"
                                className="movies-card__button movies-card__button-delete"
                                onClick={handleClickDeleteMovie}></button>)
                            : ""
                    )
                }
            </div>
        </div>
    );
}

export default MoviesCardList;