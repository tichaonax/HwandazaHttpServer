import { createReducer } from "../utility";
import { 
    SET_NOTIFICATION_INFO, 
    SET_NOTIFICATION_ERROR, 
    SET_NOTIFICATION_WARN,
    SET_NOTIFICATION_SUCCESS,
    RESET_NOTIFICATIONS,
 } from "../actions";

export const notification = createReducer(null, {
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
