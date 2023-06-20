export interface Movie {
    Title: string;
    Year: string;
    imdbID: string;
    Type: string;
    Poster: string
}

export interface MovieState {
    movies: Movie[];
    loading: boolean;
    totalPage: number;
    error?: string;
}

export enum MovieActionTypes {
    SEARCH_MOVIES_REQUEST = 'SEARCH_MOVIES_REQUEST',
    SEARCH_MOVIES_SUCCESS = 'SEARCH_MOVIES_SUCCESS',
    SEARCH_MOVIES_FAILURE = 'SEARCH_MOVIES_FAILURE'
}

export interface SearchMoviesRequestPayload {
    title: string;
    page: number
}

export interface SearchMoviesRequestAction {
    type: MovieActionTypes.SEARCH_MOVIES_REQUEST;
    payload: SearchMoviesRequestPayload
}

export interface SearchMoviesSuccessAction {
    type: MovieActionTypes.SEARCH_MOVIES_SUCCESS;
    payload: any; // TODO: replace to server success returns payload interface soon
}

export interface SearchMoviesFailureAction {
    type: MovieActionTypes.SEARCH_MOVIES_FAILURE;
    payload: any // TODO: replace to server failure returns payload interface soon
}

export type MovieAction = SearchMoviesRequestAction | SearchMoviesSuccessAction | SearchMoviesFailureAction;

