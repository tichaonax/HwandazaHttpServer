import { createReducer } from "../utility";
import { SET_SEARCH_RESULT } from "../actions";

export const searchResult = createReducer(null, {
  [SET_SEARCH_RESULT](state, action) {
    return Object.assign({}, state, { songList: action.songList });
  }
});