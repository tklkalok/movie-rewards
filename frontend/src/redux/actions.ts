import { MovieActionTypes, SearchMoviesRequestPayload } from "./types";

export const searchMovies = (payload: SearchMoviesRequestPayload) => ({
    type: MovieActionTypes.SEARCH_MOVIES_REQUEST,
    payload: payload,
});

export const selectMovie = (imdbID: string) => ({
    type: MovieActionTypes.SELECT_MOVIE,
    payload: imdbID
});

export const searchMovieDetail = (imdbID: string) => ({
    type: MovieActionTypes.SEARCH_MOVIE_DETAIL_REQUEST,
    payload: imdbID
});

export const saveMovie = (imdbID: string) => ({
    type: MovieActionTypes.SAVE_MOVIE_REQUEST,
    payload: imdbID
})

export const fetchSavedMovies = () => ({
    type: MovieActionTypes.FETCH_SAVED_MOVIES_REQUEST
})