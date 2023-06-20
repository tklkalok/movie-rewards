import { takeEvery, select, put, call } from 'redux-saga/effects';
import { MovieActionTypes, SearchMoviesRequestAction } from './types';

function* searchMoviesSaga(action: SearchMoviesRequestAction): Generator<any, void, any> {
    try {
        const response = yield call(fetch, `http://127.0.0.1:8000/movies/search?title=${action.payload.title}&page=${action.payload.page}`)
        const data = yield response.json();

        yield put({type: MovieActionTypes.SEARCH_MOVIES_SUCCESS, payload: data})
    }catch (error) {
        yield put({type: MovieActionTypes.SEARCH_MOVIES_FAILURE, payload: error})
    }
}

export function* watchSearchMoviesSaga() {
    yield takeEvery(MovieActionTypes.SEARCH_MOVIES_REQUEST, searchMoviesSaga);
}

export default watchSearchMoviesSaga;