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
    GET_RANDOM_BACKGROUND_IMAGE,
    setRandomBackGroundImage,
    setApiCallFailed,
  } from "../actions";
  
  function* fetchFromRaspbery() {
    const url = `${Utils.getBaseUrl()}/hwandazaautomation/cover`;
    try {
      const response = yield call(fetch, url);
      const data = yield apply(response, response.json);
      if (data && data.Url){
        yield put(setRandomBackGroundImage(data.Url));
      }
    } catch (error) {
      yield put(setApiCallFailed({error: error}));
    }
  }
  
  export function* backgroundImageSaga() {
    console.log("backgroundImageSaga starterd");  
    yield takeLatest(GET_RANDOM_BACKGROUND_IMAGE, fetchFromRaspbery);
  }