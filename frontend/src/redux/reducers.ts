import { MovieAction, MovieActionTypes, MovieState } from "./types";

const initialState: MovieState = {
    movies: [],
    loading: false,
    error: undefined,
    totalPage: 0
}

const movieReducer = (state = initialState, action: MovieAction) : MovieState => {
    switch (action.type) {
        case MovieActionTypes.SEARCH_MOVIES_REQUEST:
            return {...state, loading: true, error: undefined}
        case MovieActionTypes.SEARCH_MOVIES_SUCCESS:
            return {...state, loading: false, movies: action.payload.movies, totalPage: action.payload.totalPage}
        case MovieActionTypes.SEARCH_MOVIES_FAILURE:
            return {...state, loading: false, error: action.payload}
        default: 
            return state;
    }
};

export default movieReducer;