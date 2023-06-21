import { takeEvery, put, call, all, delay } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { MovieActionTypes, SearchMovieDetailRequestAction, SearchMoviesRequestAction, SaveMovieRequestAction, RemoveMovieRequestAction, FetchSavedMoviesRequestAction } from './types';

const resetErrorDelay = 3000;

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

        if (!response.ok) {
            yield put({type: MovieActionTypes.SEARCH_MOVIE_DETAIL_FAILURE, payload: data})
            yield delay(resetErrorDelay);
            yield put({type: MovieActionTypes.RESET_ERROR});
        }

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

        if (!response.ok) {
            yield put({type: MovieActionTypes.SAVE_MOVIE_FAILURE, payload: data}) 
            yield delay(resetErrorDelay);
            yield put({type: MovieActionTypes.RESET_ERROR}); 
        }

        yield put({type: MovieActionTypes.SAVE_MOVIE_SUCCESS, payload: data})
        // Dispatch fetchSavedMovies action after movie is saved
        yield put({type: MovieActionTypes.FETCH_SAVED_MOVIES_REQUEST});
    }catch (error){
        yield put({type: MovieActionTypes.SAVE_MOVIE_FAILURE, payload: error})  
    }
}

export function* watchSaveMovie() {
    yield takeEvery(MovieActionTypes.SAVE_MOVIE_REQUEST, saveMovieSaga);
}

function* removeMovieSaga(action: RemoveMovieRequestAction): Generator<any, void, any> {
    try {
        const imdbID = action.payload;
        const options = {
            method: 'DELETE'
        }
        const response = yield call(fetch, `http://127.0.0.1:8000/movies/deleteByImdbid?imdbID=${imdbID}`, options);
        const data = yield response.json();

        if (!response.ok) {
            yield put({type: MovieActionTypes.REMOVE_MOVIE_FAILURE, payload: data})
            yield delay(resetErrorDelay);
            yield put({type: MovieActionTypes.RESET_ERROR});
        }

        yield put({type: MovieActionTypes.REMOVE_MOVIE_SUCCESS, payload: data})
        // Dispatch fetchSavedMovies action after movie is saved
        yield put({type: MovieActionTypes.FETCH_SAVED_MOVIES_REQUEST});
    }catch (error: any){
        yield put({type: MovieActionTypes.REMOVE_MOVIE_FAILURE, payload: data})
    }
}

export function* watchRemoveMovie() {
    yield takeEvery(MovieActionTypes.REMOVE_MOVIE_REQUEST, removeMovieSaga);
}

function* fetchSavedMoviesSaga(action: FetchSavedMoviesRequestAction): Generator<any, void, any> {
    try {
        const response = yield call(fetch, `http://127.0.0.1:8000/movies`);
        const data = yield response.json();
        yield put({type: MovieActionTypes.FETCH_SAVED_MOVIES_SUCCESS, payload: data})
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
        watchRemoveMovie(),
    ])
}