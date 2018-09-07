import produce from "immer";
import moment from "moment";
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
    //"statusDate": "2018-09-07 01:19:44"
    const dateTime = moment().format("YYYY-MM-DD HH:mm:ss");
 
    switch (Math.round(Math.random() * 8)) {
      case 0:
        return produce(state, draft => {
          draft.status.modules.Irrigator.power = (draft.status.modules.Irrigator.power === 0) ? 1 : 0;
          draft.statusDate = dateTime;
        });

      case 1:
        return produce(state, draft => {
          draft.status.modules.FishPond.power = (draft.status.modules.FishPond.power === 0) ? 1 : 0;
          draft.statusDate = dateTime;
        });

      case 2:
        return produce(state, draft => {
          draft.status.modules.WaterPump.power = (draft.status.modules.WaterPump.power === 0) ? 1 : 0;
          draft.statusDate = dateTime;
        });

      case 3:
        return produce(state, draft => {
          draft.status.lights.L3 = (draft.status.lights.L3 === 0) ? 1 : 0;
          draft.statusDate = dateTime;
        });

      case 4:
        return produce(state, draft => {
          draft.status.lights.L4 = (draft.status.lights.L4 === 0) ? 1 : 0;
          draft.statusDate = dateTime;
        });

      case 5:
        return produce(state, draft => {
          draft.status.lights.L5 = (draft.status.lights.L5 === 0) ? 1 : 0;
          draft.statusDate = dateTime;
        });

      case 6:
        return produce(state, draft => {
          draft.status.lights.L6 = (draft.status.lights.L6 === 0) ? 1 : 0;
          draft.statusDate = dateTime;
        });

      case 7:
        return produce(state, draft => {
          draft.status.lights.M1 = (draft.status.lights.M1 === 0) ? 1 : 0;
          draft.statusDate = dateTime;
        });

      default:
        return produce(state, draft => {
          draft.status.lights.M2 = (draft.status.lights.M2 === 0) ? 1 : 0;
          draft.statusDate = dateTime;
        });
    }
  }
});