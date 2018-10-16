import { navigation } from "./navigation";
import { automation } from "./hwandaStatus";
import { apiErrors } from "./apiErrors";
import { galleryImages } from "./galleryImages";
import { musicFiles } from "./musicFiles";
import { combineReducers } from "../store/combineReducers";

export const reducer = combineReducers({
  automation,
  navigation,
  apiErrors,
  galleryImages,
  musicFiles, 
});
