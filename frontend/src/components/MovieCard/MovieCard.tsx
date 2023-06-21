import React,  { FC } from 'react';
import styles from './MovieCard.module.css';
import fallbackImage from '../../assets/fallback_poster.svg';


interface MovieCardProps {
    movie: {
        Year: string;
        Type: string;
        Title: string;
        imdbID: string;
        Poster: string;
    };
    savedMoviesImdbID: string[];
    clickHandler: (imdbID: string)=>void;
    saveHandler: (imdbID: string)=>void;
}

export const MovieCard:FC<MovieCardProps> = ({ movie, savedMoviesImdbID, clickHandler, saveHandler }) => {
    const saved = savedMoviesImdbID.includes(movie.imdbID);
    const poster = movie.Poster === 'N/A' ? fallbackImage : movie.Poster;

    const onSaveMovieBtnClick = (evt: React.MouseEvent<HTMLElement>) => {
        evt.stopPropagation();
        saveHandler(movie.imdbID);
    }

    return (
    <div className={styles.movieCard} onClick={()=>clickHandler(movie.imdbID)}>
        <img className={styles.moviePoster} src={poster} alt={movie.Title} />
        <h2 className={styles.movieTitle}>{movie.Title}</h2>
        <p className={styles.movieMeta}>{movie.Year} | {movie.Type.toUpperCase()}</p>
        <button disabled={saved} className={styles.saveBtn} onClick={onSaveMovieBtnClick}>
            Save
        </button>
    </div>
  )
}