import { createReducer } from "../utility";
import { SET_PICTURES, SET_VIDEOS, SET_SONGS } from "../actions";

export const mediaLibrary = createReducer(null, {
  [SET_PICTURES](state, action) {
    return Object.assign({}, state, { pictureList: action.pictureList });
  },
  [SET_VIDEOS](state, action) {
    return Object.assign({}, state, { videoList: action.videoList });
  },
  [SET_SONGS](state, action) {
    return Object.assign({}, state, { songList: action.songList });
  }
});