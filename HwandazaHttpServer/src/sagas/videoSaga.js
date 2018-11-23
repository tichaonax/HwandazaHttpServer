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
    setApiCallFailed,
    setVideos,
    GET_VIDEOS,
  } from "../actions";
  
  function* fetchFromRaspbery() {
    const url = `${Utils.getBaseUrl()}/hwandazaautomation/videos`;
    try {
      const response = yield call(fetch, url);
      const data = yield apply(response, response.json);
      yield put(setVideos(data));
    } catch (error) {
      //console.log('Error API:', error);
      yield put(setApiCallFailed({error: error}));
    }
  }
  
  export function* videoSaga() {
    console.log("video saga starterd");  
    //fetch real data
    yield takeLatest(GET_VIDEOS, fetchFromRaspbery);
  }