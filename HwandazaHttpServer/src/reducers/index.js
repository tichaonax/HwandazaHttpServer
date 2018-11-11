import { combineReducers } from 'redux';
import { navigation } from "./navigation";
import { automation } from "./hwandaStatus";
import { apiErrors } from "./apiErrors";
import { mediaLibrary } from "./mediaLibrary";
import { searchResult } from "./searchResult";
import { favoriteTracks } from "./favoriteTracks";

export const reducer = combineReducers({
  automation,
  navigation,
  apiErrors,
  mediaLibrary,
  searchResult,
  favoriteTracks, 
});
