import { navigation } from "./navigation";
import { automation } from "./hwandaStatus";
import { apiErrors } from "./apiErrors";
import { mediaLibrary } from "./mediaLibrary";
import { combineReducers } from "../store/combineReducers";

export const reducer = combineReducers({
  automation,
  navigation,
  apiErrors,
  mediaLibrary, 
});
