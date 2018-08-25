import { createReducer } from "../utility";
import { SET_STATUS } from "../actions";

export const hwandaStatus = createReducer(null, {
  [SET_STATUS](state, action) {
    return state.set(`status`, action.status);
  },
});
