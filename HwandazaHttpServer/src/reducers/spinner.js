import { createReducer } from "../utility";
import { SET_LOADING_STATUS } from "../actions";

export const spinner = createReducer(null, {
  [SET_LOADING_STATUS](state, action) {
    return Object.assign({}, state, { loading: action.loading });
  },
});
