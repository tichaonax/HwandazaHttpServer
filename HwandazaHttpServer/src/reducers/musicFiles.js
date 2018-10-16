import { createReducer } from "../utility";
import { SET_MUSIC_FILES } from "../actions";

export const musicFiles = createReducer(null, {
  [SET_MUSIC_FILES](state, action) {
    return Object.assign({}, state, { mp3List: action.mp3List });
  }
});