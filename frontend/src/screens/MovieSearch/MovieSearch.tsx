import React,  { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MovieState } from '../../redux/types';
import { searchMovies } from '../../redux/actions';
import styles from './MovieSearch.module.css';
import { MovieCard } from '../../components/MovieCard/MovieCard';

export const MovieSearch:FC = () => {
    const [title, setTitle] = useState('');
    const dispatch = useDispatch();
    const movies = useSelector((state: MovieState) => state.movies);
    const movieState = useSelector((state: MovieState) => state);

    const handleSearch = () => {
        dispatch(searchMovies({
            title: title,
            page: 1
        }));
    };

    return (
    <div className={styles.movieSearchBody}>
        <h3>Movie Search</h3>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)}></input>
        <button onClick={handleSearch}>Search</button>
        <div className={styles.movieList}>
            {
                movies.map( movie =>
                    <MovieCard movie={movie}/>
                )
            }
        </div>
    </div>
)
}