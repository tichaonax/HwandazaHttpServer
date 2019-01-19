import produce from "immer";
import format from "date-fns/format";

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
    const dateTime = format(new Date(), "YYYY-MM-DD HH:mm:ss");
 
    switch (Math.round(Math.random() * 8)) {
      case 0:
        return produce(state, draft => {
          draft.status.modules.irrigator.power = (draft.status.modules.irrigator.power === 0) ? 1 : 0;
          draft.statusDate = dateTime;
          draft.status.modules.irrigator.lastUpdate = dateTime;
        });

      case 1:
        return produce(state, draft => {
          draft.status.modules.fishPond.power = (draft.status.modules.fishPond.power === 0) ? 1 : 0;
          draft.statusDate = dateTime;
          draft.status.modules.fishPond.lastUpdate = dateTime;
        });

      case 2:
        return produce(state, draft => {
          draft.status.modules.waterPump.power = (draft.status.modules.waterPump.power === 0) ? 1 : 0;
          draft.statusDate = dateTime;
          draft.status.modules.waterPump.lastUpdate = dateTime;
        });

      case 3:
        return produce(state, draft => {
          draft.status.lights.l3 = (draft.status.lights.l3 === 0) ? 1 : 0;
          draft.statusDate = dateTime;
        });

      case 4:
        return produce(state, draft => {
          draft.status.lights.l4 = (draft.status.lights.l4 === 0) ? 1 : 0;
          draft.statusDate = dateTime;
        });

      case 5:
        return produce(state, draft => {
          draft.status.lights.l5 = (draft.status.lights.l5 === 0) ? 1 : 0;
          draft.statusDate = dateTime;
        });

      case 6:
        return produce(state, draft => {
          draft.status.lights.l6 = (draft.status.lights.l6 === 0) ? 1 : 0;
          draft.statusDate = dateTime;
        });

      case 7:
        return produce(state, draft => {
          draft.status.lights.m1 = (draft.status.lights.m1 === 0) ? 1 : 0;
          draft.statusDate = dateTime;
        });

      default:
        return produce(state, draft => {
          draft.status.lights.m2 = (draft.status.lights.m2 === 0) ? 1 : 0;
          draft.statusDate = dateTime;
        });
    }
  }
});