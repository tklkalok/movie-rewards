import React,  { FC, useState } from 'react';
import styles from './MovieCard.module.css';

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
  
    return (
    <div className={styles.movieCard} onClick={()=>clickHandler(movie.imdbID)}>
        <img className={styles.moviePoster} src={movie.Poster} alt={movie.Title} />
        <h2 className={styles.movieTitle}>{movie.Title}</h2>
        <p className={styles.movieMeta}>{movie.Year} | {movie.Type.toUpperCase()}</p>
        <button disabled={saved} className={styles.saveBtn} onClick={()=>{saveHandler(movie.imdbID)}}>
            Save
        </button>
    </div>
  )
}