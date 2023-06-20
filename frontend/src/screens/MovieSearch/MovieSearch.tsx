import React,  { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Movie, MovieState } from '../../redux/types';
import { fetchSavedMovies, searchMovies, selectMovie, searchMovieDetail, saveMovie } from '../../redux/actions';
import styles from './MovieSearch.module.css';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { MovieDetail } from '../../components/MovieDetail/MovieDetail';
import { PageNavigator } from '../../components/PageNavigator/PageNavigator';

export const MovieSearch:FC = () => {
    const [title, setTitle] = useState('disney');
    const dispatch = useDispatch();
    const movieState = useSelector((state: MovieState) => state);
    const movies = useSelector((state: MovieState) => state.movies);
    const totalPage = useSelector((state: MovieState) => state.totalPage);
    const currentPage = useSelector((state: MovieState) => state.currentPage);
    const movieDetail = useSelector((state: MovieState) => state.selectedMovieDetail);
    const savedMoviesImdbID = useSelector((state: MovieState) => state.savedMoviesImdbID);

    useEffect(() => {
        dispatch(fetchSavedMovies());
    }, [dispatch]);

    const handleSearch = (title: string, page: number) => {
        dispatch(searchMovies({title: title, page: page}));
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
            <button onClick={()=>{handleSearch(title, 1)}}>Search</button>
            <div className={styles.movieList}>
                {
                    movies.map( movie =>
                        <MovieCard movie={movie} savedMoviesImdbID={savedMoviesImdbID} clickHandler={handleMovieCardClick} saveHandler={handleMovieSave} key={movie.imdbID}/>
                    )
                }
            </div>
            {/* <pre id="json">{JSON.stringify(movieState, undefined, 2)}</pre> */}

            {/* Page navigator */}
            <PageNavigator totalPage={totalPage} currentPage={currentPage} onChangePage={(page)=>{handleSearch(title, page)}}/>
        </div>
    </div>
)
}