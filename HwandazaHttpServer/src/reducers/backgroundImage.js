import { createReducer } from '../utility';
import {
    SET_RANDOM_BACKGROUND_IMAGE,
 } from '../actions';

export const backgroundImage = createReducer({}, {

  [SET_RANDOM_BACKGROUND_IMAGE](state, action) {
    return Object.assign({}, state, { Url: action.backgroundImage });
  },
});

export default backgroundImage;