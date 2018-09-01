import { navigation } from "./navigation";
import { automation } from "./hwandaStatus";
import { combineReducers } from "../store/combineReducers";

export const reducer = combineReducers({
  automation,
  navigation, 
});
