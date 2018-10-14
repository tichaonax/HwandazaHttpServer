import {
    apply,
    call,
    put,
    takeLatest,
  } from "redux-saga/effects";
  
  import fetch from 'isomorphic-fetch';
  
  import {
    Utils
  } from "../utility";
  
  import {
    GET_GALLERY_IMAGES,
    setGalleryImages,
    setApiCallFailed,
  } from "../actions";
  
  function* fetchFromRaspbery() {
    const url = `${Utils.getBaseUrl()}/gallery/filelist`;
    try {
      const response = yield call(fetch, url);
      const data = yield apply(response, response.json);
      console.log("api response", JSON.stringify(data));
      yield put(setGalleryImages(data));
    } catch (error) {
      console.log('Error API:', error);
      yield put(setApiCallFailed({error: error}));
    }
  }
  
  export function* galleryImagesSaga() {
    console.log("galleryImages saga starterd");  
    //fetch real data
    yield takeLatest(GET_GALLERY_IMAGES, fetchFromRaspbery);
  }