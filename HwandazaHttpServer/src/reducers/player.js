import { createReducer } from '../utility';
import {
  SET_DESELECT_SEARCH_AS_YOU_TYPE,
  SET_DESELECT_ARTIST,
  SET_MUSIC_ROOT_FOLDERS,
  SET_LOAD_SONGS_ON_LIST_FINISHED,
  SET_NOTIFICATION_INFO, 
  SET_NOTIFICATION_ERROR, 
  SET_NOTIFICATION_WARN,
  SET_NOTIFICATION_SUCCESS,
  RESET_NOTIFICATIONS,
 } from '../actions';

export const player = createReducer({}, {
  [SET_DESELECT_SEARCH_AS_YOU_TYPE](state, action) {
    return Object.assign({}, state, { selectSong: action.status });
  },

  [SET_DESELECT_ARTIST](state, action) {
    return Object.assign({}, state, { selectArtist: action.status });
  },

  [SET_MUSIC_ROOT_FOLDERS](state, action) {
    return Object.assign({}, state, { folders: action.rootFolders });
  },

  [SET_LOAD_SONGS_ON_LIST_FINISHED](state, action) {
    return Object.assign({}, state, { loadSongsOnListFinished: action.loadMore });
  },

  [SET_NOTIFICATION_INFO](state, action) {
    return Object.assign({}, state, { info: action.info });
  },

  [SET_NOTIFICATION_ERROR](state, action) {
    return Object.assign({}, state, { error: action.error });
  },

  [SET_NOTIFICATION_WARN](state, action) {
    return Object.assign({}, state, { warn: action.warn });
  },

  [SET_NOTIFICATION_SUCCESS](state, action) {
    return Object.assign({}, state, { success: action.success });
  },

  [RESET_NOTIFICATIONS](state) {
    return Object.assign({}, state, { warn: null, success: null, info: null, error: null});
  },
});

export default player;