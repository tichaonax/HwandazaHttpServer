import { createReducer } from '../utility';
import { SET_FAVORITE_TRACK } from '../actions';

export const favoriteTracks = createReducer({}, {
  [SET_FAVORITE_TRACK](state, action) {
    return [...state, action.favoriteTrack ];
  },
});

export default favoriteTracks;