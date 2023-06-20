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
    error?: string;
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
    SEARCH_MOVIES_REQUEST = 'SEARCH_MOVIES_REQUEST',
    SEARCH_MOVIES_SUCCESS = 'SEARCH_MOVIES_SUCCESS',
    SEARCH_MOVIES_FAILURE = 'SEARCH_MOVIES_FAILURE',
    SELECT_MOVIE = 'SELECT_MOVIE',
    SEARCH_MOVIE_DETAIL_REQUEST = 'SEARCH_MOVIE_DETAIL_REQUEST',
    SEARCH_MOVIE_DETAIL_SUCCESS = 'SEARCH_MOVIE_DETAIL_SUCCESS',
    SEARCH_MOVIE_DETAIL_FAILURE = 'SEARCH_MOVIE_DETAIL_FAILURE',
    SAVE_MOVIE_REQUEST = 'SAVE_MOVIE_REQUEST',
    SAVE_MOVIE_SUCCESS = 'SAVE_MOVIE_SUCCESS',
    SAVE_MOVIE_FAILURE = 'SAVE_MOVIE_FAILURE',
    FETCH_SAVED_MOVIES_REQUEST = 'FETCH_SAVED_MOVIES_REQUEST',
    FETCH_SAVED_MOVIES_SUCCESS = 'FETCH_SAVED_MOVIES_SUCCESS',
    FETCH_SAVED_MOVIES_FAILURE = 'FETCH_SAVED_MOVIES_FAILURE',    
}

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

//------------------ Select Movie ------------------
export interface SelectMovieAction {
    type: MovieActionTypes.SELECT_MOVIE;
    payload: string;
}
//------------------ /Search Movie ------------------

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
    SearchMoviesRequestAction | 
    SearchMoviesSuccessAction | 
    SearchMoviesFailureAction | 
    SelectMovieAction |
    SearchMovieDetailRequestAction |
    SearchMovieDetailSuccessAction |
    SearchMovieDetailFailureAction |
    SaveMovieRequestAction |
    SaveMovieSuccessAction |
    SaveMovieFailureAction |
    FetchSavedMoviesRequestAction |
    FetchSavedMoviesSuccessAction |
    FetchSavedMoviesFailureAction

