import React,  { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MovieState } from '../../redux/types';
import { fetchSavedMovies, searchMovies, selectMovie, searchMovieDetail, saveMovie } from '../../redux/actions';
import styles from './MovieSearch.module.css';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { MovieDetail } from '../../components/MovieDetail/MovieDetail';

export const MovieSearch:FC = () => {
    const [title, setTitle] = useState('disney');
    const dispatch = useDispatch();
    const movies = useSelector((state: MovieState) => state.movies);
    const movieDetail = useSelector((state: MovieState) => state.selectedMovieDetail);
    const movieState = useSelector((state: MovieState) => state);

    useEffect(() => {
        dispatch(fetchSavedMovies());
    }, [dispatch]);

    const handleSearch = () => {
        dispatch(searchMovies({title: title, page: 1}));
    };

    const handleMovieCardClick = (imdbID: string) => {
        dispatch(selectMovie(imdbID));
        dispatch(searchMovieDetail(imdbID));
    };

    const handleMovieSave = (imdbID: string) => {
        dispatch(saveMovie(imdbID));
    }

    return (
    <div className={styles.movieSearchBody}>
        {movieDetail && <MovieDetail movie={movieDetail} saveHandler={handleMovieSave}/>}
        <div className={styles.movieGallery}>
            <h3>Movie Search</h3>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)}></input>
            <button onClick={handleSearch}>Search</button>
            <div className={styles.movieList}>
                {
                    movies.map( movie =>
                        <MovieCard movie={movie} clickHandler={handleMovieCardClick} saveHandler={handleMovieSave} key={movie.imdbID}/>
                    )
                }
            </div>
            <pre id="json">{JSON.stringify(movieState, undefined, 2)}</pre>
        </div>
    </div>
)
}