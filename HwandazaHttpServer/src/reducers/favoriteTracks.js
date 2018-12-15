import { createReducer } from '../utility';
import {
  ADD_FAVORITE_TRACK,
  REMOVE_FAVORITE_TRACK,
 } from '../actions';

export const favoriteTracks = createReducer({}, {
  [ADD_FAVORITE_TRACK](state, action) {
    return [...state, {...action.favoriteTrack} ];
  },

  [REMOVE_FAVORITE_TRACK](state, action) {
    return state.filter(({ Url }) => Url !== action.favoriteTrack.Url);
  },
});