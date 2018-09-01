import produce from "immer";

import {
  createReducer
} from "../utility";

import {
  SET_STATUS,
  RANDOM_TOGGLE_STATUS
} from "../actions";

export const automation = createReducer(null, {

  [SET_STATUS](state, action) {
    return (action.automation);
  },
  [RANDOM_TOGGLE_STATUS](state, {}) {
    //console.log("toggle state", JSON.stringify(state));
    switch (Math.round(Math.random() * 8)) {
      case 0:
        return produce(state, draft => {
          draft.status.modules.Irrigator.power = (draft.status.modules.Irrigator.power === 0) ? 1 : 0;
        });

      case 1:
        return produce(state, draft => {
          draft.status.modules.FishPond.power = (draft.status.modules.FishPond.power === 0) ? 1 : 0;
        });

      case 2:
        return produce(state, draft => {
          draft.status.modules.WaterPump.power = (draft.status.modules.WaterPump.power === 0) ? 1 : 0;
        });

      case 3:
        return produce(state, draft => {
          draft.status.lights.L3 = (draft.status.lights.L3 === 0) ? 1 : 0;
        });

      case 4:
        return produce(state, draft => {
          draft.status.lights.L4 = (draft.status.lights.L4 === 0) ? 1 : 0;
        });

      case 5:
        return produce(state, draft => {
          draft.status.lights.L5 = (draft.status.lights.L5 === 0) ? 1 : 0;
        });

      case 6:
        return produce(state, draft => {
          draft.status.lights.L6 = (draft.status.lights.L6 === 0) ? 1 : 0;
        });

      case 7:
        return produce(state, draft => {
          draft.status.lights.M1 = (draft.status.lights.M1 === 0) ? 1 : 0;
        });

      default:
        return produce(state, draft => {
          draft.status.lights.M2 = (draft.status.lights.M2 === 0) ? 1 : 0;
        });
    }
  }
});