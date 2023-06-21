import { MovieAction, MovieActionTypes, MovieState, SavedMovie } from "./types";

const initialState: MovieState = {
    error: "",
    movies: [],
    totalPage: 0,
    loading: false,
    currentPage: 1,
    savedMovies: [],
    savedMoviesImdbID: [],
    selectedMovie: undefined,
    selectedMovieDetail: undefined,
}

const movieReducer = (state = initialState, action: MovieAction) : MovieState => {
    switch (action.type) {
        case MovieActionTypes.SELECT_MOVIE:
            return {...state, selectedMovie: action.payload }

        case MovieActionTypes.RESET_ERROR:
                return {...state, error: "" }

        case MovieActionTypes.SEARCH_MOVIES_REQUEST:
            return {...state, loading: true, currentPage: action.payload.page}
        case MovieActionTypes.SEARCH_MOVIES_SUCCESS:
            return {...state, loading: false, movies: action.payload.movies, totalPage: action.payload.totalPage}
        case MovieActionTypes.SEARCH_MOVIES_FAILURE:
            return {...state, loading: false, error: action.payload.message}

        case MovieActionTypes.SEARCH_MOVIE_DETAIL_REQUEST:
            return {...state, loading: true}
        case MovieActionTypes.SEARCH_MOVIE_DETAIL_SUCCESS:
            return {...state, loading: false, selectedMovieDetail: action.payload.movieDetail}
        case MovieActionTypes.SEARCH_MOVIE_DETAIL_FAILURE:
            return {...state, loading: false, error: action.payload.message}

        case MovieActionTypes.SAVE_MOVIE_REQUEST:
            return {...state, loading: true}
        case MovieActionTypes.SAVE_MOVIE_SUCCESS:
            return {...state, loading: false}
        case MovieActionTypes.SAVE_MOVIE_FAILURE:
            return {...state, loading: false, error: action.payload.message}

        case MovieActionTypes.REMOVE_MOVIE_REQUEST:
            return {...state, loading: true}
        case MovieActionTypes.REMOVE_MOVIE_SUCCESS:
            return {...state, loading: false}
        case MovieActionTypes.REMOVE_MOVIE_FAILURE:
            return {...state, loading: false, error: action.payload.message}

        case MovieActionTypes.FETCH_SAVED_MOVIES_REQUEST:
            return {...state, loading: true}
        case MovieActionTypes.FETCH_SAVED_MOVIES_SUCCESS:
            return {...state, loading: false, savedMovies: action.payload || [], savedMoviesImdbID: Array.isArray(action.payload) ? action.payload.map((savedMovie: SavedMovie) => savedMovie.imdbID) : []}
        case MovieActionTypes.FETCH_SAVED_MOVIES_FAILURE:
            return {...state, loading: false, error: action.payload.message}
        default: 
            return state;
    }
};

export default movieReducer;