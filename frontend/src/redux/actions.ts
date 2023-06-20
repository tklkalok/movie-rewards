import { MovieActionTypes, SearchMoviesRequestPayload } from "./types";

export const searchMovies = (payload: SearchMoviesRequestPayload) => ({
    type: MovieActionTypes.SEARCH_MOVIES_REQUEST,
    payload: payload,
})