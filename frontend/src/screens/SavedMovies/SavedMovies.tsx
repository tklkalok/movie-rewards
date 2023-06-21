import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MovieState,  } from '../../redux/types';
import { fetchSavedMovies, removeMovie } from '../../redux/actions';
import noItemImage from '../../assets/no_items.svg';
import styles from './SavedMovies.module.css';
import { MovieDetail } from '../../components/MovieDetail/MovieDetail';

export const SavedMovies:FC = () => {
    const dispatch = useDispatch();
    const savedMovies = useSelector((state: MovieState) => state.savedMovies);
    const savedMoviesImdbID = useSelector((state: MovieState) => state.savedMoviesImdbID);

    useEffect(() => {
        dispatch(fetchSavedMovies());
    }, [dispatch]);

    const handleMovieRemove = (imdbID: string) => {
        dispatch(removeMovie(imdbID));
    }

    return (
        <div className={styles.savedMoviesBody}>
            <h3>Saved Movies</h3>
            {
                savedMovies.map(movie => {
                    return <MovieDetail 
                        key={movie.imdbID}
                        isSaved={savedMoviesImdbID.includes(movie.imdbID)}
                        propClassName={styles.savedMovieList}
                        movie={movie} 
                        saveHandler={()=>{}}
                        removeHandler={handleMovieRemove}
                    />
                })
            }
            {
                !savedMovies.length && <div className={styles.noItemImgContainer}>
                    <img src={noItemImage} className={styles.noItemImg}/>
                </div>
            }
        </div>
    )
}