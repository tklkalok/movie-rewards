import React,  { FC, useState } from 'react';
import styles from './MovieCard.module.css';

interface MovieCardProps {
    movie: {
        Title: string;
        Year: string;
        imdbID: string;
        Type: string;
        Poster: string;
    }
}

export const MovieCard:FC<MovieCardProps> = ({ movie }) => {
  return (
    <div className={styles.movieCard}>
        <img className={styles.moviePoster} src={movie.Poster} alt={movie.Title} />
        <h2 className={styles.movieTitle}>{movie.Title}</h2>
        <p className={styles.movieMeta}>{movie.Year} | {movie.Type.toUpperCase()}</p>
    </div>
  )
}