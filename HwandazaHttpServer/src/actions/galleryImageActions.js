import { createAction } from "../utility";

export const GET_GALLERY_IMAGES = `GET_GALLERY_IMAGES`;

export const getGalleryImages = createAction(GET_GALLERY_IMAGES);

export const SET_GALLERY_IMAGES = `SET_GALLERY_IMAGES`;

export const setGalleryImages = createAction(SET_GALLERY_IMAGES, `imageList`);