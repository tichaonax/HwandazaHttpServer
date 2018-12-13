import { createReducer } from '../utility';
import {
  ADD_FAVORITE_TRACK,
  REMOVE_FAVORITE_TRACK,
  SET_DESELECT_SEARCH_AS_YOU_TYPE,
  SET_DESELECT_ARTIST,
  SET_MUSIC_ROOT_FOLDERS,
  SET_LOAD_SONGS_ON_LIST_FINISHED,
 } from '../actions';

export const player = createReducer({}, {
  [ADD_FAVORITE_TRACK](state, action) {
    return [...state, {...action.favoriteTrack} ];
  },
  [REMOVE_FAVORITE_TRACK](state, action) {
    return state.filter(({ Url }) => Url !== action.favoriteTrack.Url);
  },
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
  }
});

export default player;