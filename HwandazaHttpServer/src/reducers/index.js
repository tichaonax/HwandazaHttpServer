import { navigation } from "./navigation";
import { hwandaStatus } from "./hwandaStatus";
import { combineReducers } from "../store/combineReducers";

export const reducer = combineReducers({
  hwandaStatus,
  navigation, 
});
