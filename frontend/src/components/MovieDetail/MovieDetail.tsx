import React,  { FC, useState } from 'react';
import styles from './MovieDetail.module.css';

interface MovieDetailProps {
    movie: {
        Title: string;
        Year: string;
        Rated: string;
        Released: string;
        Runtime: string;
        Genre: string;
        Director: string;
        Writer: string;
        Actors: string;
        Plot: string;
        Language: string;
        Country: string;
        Awards: string;
        Poster: string;
        Ratings: string[];
        Metascoure: string;
        imdbRating: string;
        imdbVotes: string;
        imdbID: string;
        Type: string;
        DVD: string;
    };
    saveHandler: (imdbID: string)=>void;
    removeHandler: (imdbID: string)=>void;
    propClassName?: string;
    isSaved: boolean
}

export const MovieDetail:FC<MovieDetailProps> = ({ movie, saveHandler, removeHandler, propClassName, isSaved }) => {
  return (
    <div className={`${styles.movieDetail} ${propClassName}`}>
        <div className={styles.movieImg} style={{backgroundImage: `url(${movie.Poster})`}}></div>
        <div className={styles.movieContent}>
            <h2>{movie.Title}</h2>
            <p>Rated: {movie.Rated}</p>
            <p>Release: {movie.Released}</p>
            <p>Runtime: {movie.Runtime}</p>
            <p>Genre: {movie.Genre}</p>
            <p>Director: {movie.Director}</p>
            <p>Writer: {movie.Writer}</p>
            <p>Actors: {movie.Actors}</p>
            <p>Plot: {movie.Plot}</p>
            <p>Language: {movie.Language}</p>
            <p>Country: {movie.Country}</p>
            <p>Awards: {movie.Awards}</p>
            <p>Meta Source:{movie.Metascoure}</p>
            <p>Rating: {movie.imdbRating}</p>
            <p>Votes: {movie.imdbVotes}</p>
            <p>DVD: {movie.DVD}</p>
            <p>{movie.Year}</p>
            <button 
                className={styles.saveButton} 
                onClick={()=>{isSaved ? removeHandler(movie.imdbID): saveHandler(movie.imdbID)}}
            >{isSaved ? 'Remove' : 'Save'}</button>
        </div>
    </div>
  )
}