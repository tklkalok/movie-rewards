import { takeEvery, put, call, all } from 'redux-saga/effects';
import { MovieActionTypes, SearchMovieDetailRequestAction, SearchMoviesRequestAction, SaveMovieRequestAction, FetchSavedMoviesRequestAction } from './types';

function* searchMoviesSaga(action: SearchMoviesRequestAction): Generator<any, void, any> {
    try {
        const response = yield call(fetch, `http://127.0.0.1:8000/movies/search?title=${action.payload.title}&page=${action.payload.page}`);
        const data = yield response.json();

        yield put({type: MovieActionTypes.SEARCH_MOVIES_SUCCESS, payload: data})
    }catch (error) {
        yield put({type: MovieActionTypes.SEARCH_MOVIES_FAILURE, payload: error})
    }
}

export function* watchSearchMoviesSaga() {
    yield takeEvery(MovieActionTypes.SEARCH_MOVIES_REQUEST, searchMoviesSaga);
}

function* searchMovieDetailSaga(action: SearchMovieDetailRequestAction): Generator<any, void, any> {
    try {
        const response = yield call(fetch, `http://127.0.0.1:8000/movies/searchDetail?imdbID=${action.payload}`);
        const data = yield response.json();

        yield put({type: MovieActionTypes.SEARCH_MOVIE_DETAIL_SUCCESS, payload: data})
    }catch (error){
        yield put({type: MovieActionTypes.SEARCH_MOVIE_DETAIL_FAILURE, payload: error})   
    }
}

export function* watchFetchMovieDetail() {
    yield takeEvery(MovieActionTypes.SEARCH_MOVIE_DETAIL_REQUEST, searchMovieDetailSaga);
}

function* saveMovieSaga(action: SaveMovieRequestAction): Generator<any, void, any> {
    try {
        const imdbID = action.payload;
        const options = {
            method: 'POST'
        }
        const response = yield call(fetch, `http://127.0.0.1:8000/movies/?imdbID=${imdbID}`, options);
        const data = yield response.json();

        console.log("DEBUG: saveMovieSaga response: ", data);

        yield put({type: MovieActionTypes.SAVE_MOVIE_SUCCESS, payload: data})
    }catch (error){
        yield put({type: MovieActionTypes.SAVE_MOVIE_FAILURE, payload: error})   
    }
}

export function* watchSaveMovie() {
    yield takeEvery(MovieActionTypes.SAVE_MOVIE_REQUEST, saveMovieSaga);
}

function* fetchSavedMoviesSaga(action: FetchSavedMoviesRequestAction): Generator<any, void, any> {
    try {
        const response = yield call(fetch, `http://127.0.0.1:8000/movies`);
        const data = yield response.json();
        console.log("DEBUG: fetchSavedMoviesSaga response: ", data);

        yield put({type: MovieActionTypes.FETCH_SAVED_MOVIES_SUCCESS, payload: ''})
    }catch (error){
        yield put({type: MovieActionTypes.FETCH_SAVED_MOVIES_FAILURE, payload: error})   
    }
}

export function* watchFetchSavedMovies() {
    yield takeEvery(MovieActionTypes.FETCH_SAVED_MOVIES_REQUEST, fetchSavedMoviesSaga);
}

export default function* rootSaga() {
    yield all([
        watchSearchMoviesSaga(),
        watchFetchMovieDetail(),
        watchSaveMovie(),
        watchFetchSavedMovies(),
    ])
}