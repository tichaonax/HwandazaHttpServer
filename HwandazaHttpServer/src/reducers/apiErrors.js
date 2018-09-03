import { createReducer } from "../utility";
import { API_CALL_FAILED } from "../actions";

export const apiErrors = createReducer(null, {
  [API_CALL_FAILED](state, action) {
    return Object.assign({}, state, { apiErrors: action.error });
  },
});