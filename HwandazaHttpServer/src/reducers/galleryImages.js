import { createReducer } from "../utility";
import { SET_GALLERY_IMAGES } from "../actions";

export const galleryImages = createReducer(null, {
  [SET_GALLERY_IMAGES](state, action) {
    return Object.assign({}, state, { imageList: action.imageList });
  }
});