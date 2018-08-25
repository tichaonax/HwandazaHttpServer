import { createReducer } from "../utility";
import { SET_NAV_PAGE, SHOW_NAV_PAGE } from "../actions";

export const navigation = createReducer(null, {
  [SET_NAV_PAGE](state, action) {
    return Object.assign({}, state, { navpage: action.navpage });
  },

  [SHOW_NAV_PAGE](state, action) {
    return Object.assign({}, state, { shownavpage: action.shownavpage });
  }
});
