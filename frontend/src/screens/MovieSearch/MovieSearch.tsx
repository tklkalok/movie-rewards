import { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MovieState } from '../../redux/types';
import { fetchSavedMovies, searchMovies, selectMovie, searchMovieDetail, saveMovie, removeMovie } from '../../redux/actions';
import styles from './MovieSearch.module.css';
import noItemImage from '../../assets/no_items.svg';
import { MovieCard } from '../../components/MovieCard/MovieCard';
import { MovieDetail } from '../../components/MovieDetail/MovieDetail';
import { PageNavigator } from '../../components/PageNavigator/PageNavigator';

export const MovieSearch:FC = () => {
    const [title, setTitle] = useState('Disney');
    const [detailOpen, setDetailOpen] = useState(false);
    const dispatch = useDispatch();
    const movies = useSelector((state: MovieState) => state.movies);
    const totalPage = useSelector((state: MovieState) => state.totalPage);
    const currentPage = useSelector((state: MovieState) => state.currentPage);
    const movieDetail = useSelector((state: MovieState) => state.selectedMovieDetail);
    const savedMoviesImdbID = useSelector((state: MovieState) => state.savedMoviesImdbID);

    useEffect(() => {
        dispatch(fetchSavedMovies());
    }, [dispatch]);

    useEffect(() => {
        if (movieDetail) setDetailOpen(true);
    }, [movieDetail]);

    const handleSearch = (title: string, page: number) => {
        dispatch(searchMovies({title: title, page: page}));
    };
    
    const scrollTopWithAnimation = () => {
        const scrollHeight = window.scrollY;
        const scrollStep = Math.PI / ( 500 / 15 );
        const cosParameter = scrollHeight / 2;
        let scrollCount = 0;
        let scrollMargin;

        let scrollInterval = setInterval( () => {
            if ( window.scrollY !== 0 ) {
                scrollCount = scrollCount + 1;  
                scrollMargin = cosParameter - cosParameter * Math.cos( scrollCount * scrollStep );
                window.scrollTo( 0, ( scrollHeight - scrollMargin ) );
            } 
            else clearInterval(scrollInterval); 
        }, 15 );
    }

    const handleMovieCardClick = (imdbID: string) => {
        scrollTopWithAnimation();
        dispatch(selectMovie(imdbID));
        dispatch(searchMovieDetail(imdbID));
    };

    const handleMovieSave = (imdbID: string) => {
        dispatch(saveMovie(imdbID));
    }

    const handleMovieRemove = (imdbID: string) => {
        dispatch(removeMovie(imdbID));
    }

    return (
    <div className={styles.movieSearchBody}>
        <div className={`${styles.movieDetailContainer} ${detailOpen ? styles.movieDetailContainerOpen : styles.movieDetailContainerClose}`}>
            {
                movieDetail && <MovieDetail 
                    isSaved={savedMoviesImdbID.includes(movieDetail.imdbID)}
                    movie={movieDetail} 
                    saveHandler={handleMovieSave}
                    removeHandler={handleMovieRemove}
                />
            }
        </div>
        <div className={styles.movieGallery}>
            <h3>Movie Search</h3>
            {
                savedMoviesImdbID.length >=5 && 
                <div className={styles.fiveMovieLimitBanner}>You have saved 5 movie already</div>
            }
            <div className={styles.searchContainer}>
                <input className={styles.searchInput} type="text" value={title} onChange={e => setTitle(e.target.value)}></input>
                <button className={styles.searchButton} onClick={()=>{handleSearch(title, 1)}}>Search</button>
            </div>
            <div className={styles.movieList}>
                {
                    !! movies && !!movies.length && movies.map( movie =>
                        <div className={styles.movieCardContainer}>
                            <MovieCard movie={movie} savedMoviesImdbID={savedMoviesImdbID} clickHandler={handleMovieCardClick} saveHandler={handleMovieSave} key={movie.imdbID}/>
                        </div>
                    )
                }
            </div>
            {
                !! movies && !!!movies.length && <div className={styles.noItemImgContainer}>
                    <img src={noItemImage} className={styles.noItemImg}/>
                </div>
            }
            {/* <pre id="json">{JSON.stringify(movieState, undefined, 2)}</pre> */}

            {/* Page navigator */}
            <PageNavigator totalPage={totalPage} currentPage={currentPage} onChangePage={(page)=>{handleSearch(title, page)}}/>
        </div>
    </div>
)
}