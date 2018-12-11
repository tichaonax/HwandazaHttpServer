import { createReducer } from "../utility";
import {SET_DESELECT_SEARCH_AS_YOU_TYPE, SET_DESELECT_ARTIST } from "../actions";

export const deselector = createReducer(null, {
    [SET_DESELECT_SEARCH_AS_YOU_TYPE](state, action) {
        return Object.assign({}, state, { selectSong: action.status });
    },
    
    [SET_DESELECT_ARTIST](state, action) {
        return Object.assign({}, state, { selectArtist: action.status });
    },
});