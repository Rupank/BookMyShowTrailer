import { FILTER_MOVIES, FETCH_MOVIES_SUCCEEDED, FETCH_MOVIES_FAILED, FETCH_MOVIES_REQUESTED } from '../actions/types';

const initialState = {
    items: [],
    filteredData: [],
    languageList: [],
    genreList: [],
    isLoading: true,
    filters: {},
    error: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_MOVIES_REQUESTED:
            return { isLoading: true }
        case FETCH_MOVIES_FAILED:
            return { error: action.payload.error.message, isLoading: false }
        case FETCH_MOVIES_SUCCEEDED:
            return { ...state, items: action.payload.data, filteredData: action.payload.data, genreList: action.payload.genre, languageList: action.payload.lang, isLoading: false, error: '' }
        case FILTER_MOVIES:
            return { ...state, filteredData: action.payload.data, filters: action.payload.filters }

        default:
            return state;
    }
}

export const getProducts = state => state.items;
export const getFilteredProducts = state => state.filteredData;
export const getProductsPending = state => state.isLoading;
export const getProductsError = state => state.error;
export const getLanguageList = state => state.languageList;
export const getGenreList = state => state.genreList;
export const getAppliedFilters = state => state.filters;
