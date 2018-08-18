import { createReducer } from "./../utility";
import { GET_STATUS } from "./../actions/";

export const hwandazaStatus = createReducer(null, {
  [GET_STATUS](state, action) {
    return state.set(`status`, action.status);
  }
});
