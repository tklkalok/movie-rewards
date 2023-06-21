import { MovieDetail } from "../components/MovieDetail/MovieDetail";

export interface Movie {
    Year: string;
    Type: string;
    Title: string;
    imdbID: string;
    Poster: string;
}

export interface MovieDetail {
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
}

export interface SavedMovie extends MovieDetail {
    userId: string
}

export interface MovieState {
    error: string;
    movies: Movie[];
    loading: boolean;
    totalPage: number;
    currentPage: number;
    selectedMovie?: string;
    savedMovies: MovieDetail[];
    savedMoviesImdbID: string[];
    selectedMovieDetail?: MovieDetail;
}

export enum MovieActionTypes {
    SELECT_MOVIE = 'SELECT_MOVIE',
    RESET_ERROR = 'RESET_ERROR',
    SEARCH_MOVIES_REQUEST = 'SEARCH_MOVIES_REQUEST',
    SEARCH_MOVIES_SUCCESS = 'SEARCH_MOVIES_SUCCESS',
    SEARCH_MOVIES_FAILURE = 'SEARCH_MOVIES_FAILURE',
    SEARCH_MOVIE_DETAIL_REQUEST = 'SEARCH_MOVIE_DETAIL_REQUEST',
    SEARCH_MOVIE_DETAIL_SUCCESS = 'SEARCH_MOVIE_DETAIL_SUCCESS',
    SEARCH_MOVIE_DETAIL_FAILURE = 'SEARCH_MOVIE_DETAIL_FAILURE',
    SAVE_MOVIE_REQUEST = 'SAVE_MOVIE_REQUEST',
    SAVE_MOVIE_SUCCESS = 'SAVE_MOVIE_SUCCESS',
    SAVE_MOVIE_FAILURE = 'SAVE_MOVIE_FAILURE',
    REMOVE_MOVIE_REQUEST = 'REMOVE_MOVIE_REQUEST',
    REMOVE_MOVIE_SUCCESS = 'REMOVE_MOVIE_SUCCESS',
    REMOVE_MOVIE_FAILURE = 'REMOVE_MOVIE_FAILURE',
    FETCH_SAVED_MOVIES_REQUEST = 'FETCH_SAVED_MOVIES_REQUEST',
    FETCH_SAVED_MOVIES_SUCCESS = 'FETCH_SAVED_MOVIES_SUCCESS',
    FETCH_SAVED_MOVIES_FAILURE = 'FETCH_SAVED_MOVIES_FAILURE',        
}

//------------------ Select Movie ------------------
export interface SelectMovieAction {
    type: MovieActionTypes.SELECT_MOVIE;
    payload: string;
}
//------------------ /Search Movie ------------------

//------------------ Reset Error ------------------
export interface ResetErrorAction {
    type: MovieActionTypes.RESET_ERROR;
}
//------------------ /Reset Error ------------------

//------------------ Search Movies ------------------
export interface SearchMoviesRequestPayload {
    title: string;
    page: number;
}

export interface SearchMoviesSuccessPayload {
    success: string;
    movies: Movie[];
    totalPage: number;
    currentPage: number;
    timestamp: string;
}

export interface SearchMoviesFailurePayload {
    success: string;
    code: string;
    message: string;
}

export interface SearchMoviesRequestAction {
    type: MovieActionTypes.SEARCH_MOVIES_REQUEST;
    payload: SearchMoviesRequestPayload
}

export interface SearchMoviesSuccessAction {
    type: MovieActionTypes.SEARCH_MOVIES_SUCCESS;
    payload: SearchMoviesSuccessPayload;
}

export interface SearchMoviesFailureAction {
    type: MovieActionTypes.SEARCH_MOVIES_FAILURE;
    payload: SearchMoviesFailurePayload;
}
//------------------ /Search Movies ------------------

//------------------ Search Movie Detail ------------------
export interface SearchMovieDetailRequestPayload {
    imdbID: string;
}

export interface SearchMovieDetailSuccessPayload {
    success: string;
    movieDetail: MovieDetail;
    timestamp: string;
}

export interface SearchMovieDetailFailurePayload {
    success: string;
    code: string;
    message: string;
}

export interface SearchMovieDetailRequestAction {
    type: MovieActionTypes.SEARCH_MOVIE_DETAIL_REQUEST;
    payload: SearchMovieDetailRequestPayload;
}

export interface SearchMovieDetailSuccessAction {
    type: MovieActionTypes.SEARCH_MOVIE_DETAIL_SUCCESS;
    payload: SearchMovieDetailSuccessPayload;
}

export interface SearchMovieDetailFailureAction {
    type: MovieActionTypes.SEARCH_MOVIE_DETAIL_FAILURE;
    payload: SearchMovieDetailFailurePayload;
}
//------------------ /Search Movie Detail ------------------

//------------------ Save Movie ------------------
export interface SaveMovieRequestPayload {
    imdbID: string;
}

export interface SaveMovieSuccessPayload {
    success: string;
    movie: MovieDetail;
    timestamp: string;
}

export interface SaveMovieFailurePayload {
    success: string;
    code: string;
    message: string;
}

export interface SaveMovieRequestAction {
    type: MovieActionTypes.SAVE_MOVIE_REQUEST;
    payload: SaveMovieRequestPayload;
}

export interface SaveMovieSuccessAction {
    type: MovieActionTypes.SAVE_MOVIE_SUCCESS;
    payload: SaveMovieSuccessPayload
}

export interface SaveMovieFailureAction {
    type: MovieActionTypes.SAVE_MOVIE_FAILURE;
    payload: SaveMovieFailurePayload
}
//------------------ /Save Movie ------------------

//------------------ Remove Movie ------------------
export interface RemoveMovieRequestPayload {
    imdbID: string;
}

export interface RemoveMovieSuccessPayload {
    success: string;
    timestamp: string;
}

export interface RemoveMovieFailurePayload {
    success: string;
    code: string;
    message: string;
}

export interface RemoveMovieRequestAction {
    type: MovieActionTypes.REMOVE_MOVIE_REQUEST;
    payload: RemoveMovieRequestPayload;
}

export interface RemoveMovieSuccessAction {
    type: MovieActionTypes.REMOVE_MOVIE_SUCCESS;
    payload: RemoveMovieSuccessPayload
}

export interface RemoveMovieFailureAction {
    type: MovieActionTypes.REMOVE_MOVIE_FAILURE;
    payload: RemoveMovieFailurePayload
}
//------------------ /Remove Movie ------------------

//------------------ Fetch Saved Movie ------------------
export interface FetchSavedMoviesRequestAction {
    type: MovieActionTypes.FETCH_SAVED_MOVIES_REQUEST;
    payload: SaveMovieRequestPayload;
}

export interface FetchSavedMoviesSuccessAction {
    type: MovieActionTypes.FETCH_SAVED_MOVIES_SUCCESS;
    payload: any; // TODO: replace by typed payload
}

export interface FetchSavedMoviesFailureAction {
    type: MovieActionTypes.FETCH_SAVED_MOVIES_FAILURE;
    payload: any; // TODO: replace by typed payload
}
//------------------ /Fetch Saved Movie ------------------

export type MovieAction = 
    SelectMovieAction |
    ResetErrorAction | 
    SearchMoviesRequestAction | 
    SearchMoviesSuccessAction | 
    SearchMoviesFailureAction | 
    SearchMovieDetailRequestAction |
    SearchMovieDetailSuccessAction |
    SearchMovieDetailFailureAction |
    SaveMovieRequestAction |
    SaveMovieSuccessAction |
    SaveMovieFailureAction |
    RemoveMovieRequestAction |
    RemoveMovieSuccessAction |
    RemoveMovieFailureAction |
    FetchSavedMoviesRequestAction |
    FetchSavedMoviesSuccessAction |
    FetchSavedMoviesFailureAction

