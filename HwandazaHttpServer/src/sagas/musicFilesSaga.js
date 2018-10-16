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
    GET_MUSIC_FILES,
    setMusicFiles,
    setApiCallFailed,
  } from "../actions";
  
  function* fetchFromRaspbery() {
    const url = `${Utils.getBaseUrl()}/music/filelist`;
    try {
      const response = yield call(fetch, url);
      const data = yield apply(response, response.json);
      console.log("api response", JSON.stringify(data));
      yield put(setMusicFiles(data));
    } catch (error) {
      console.log('Error API:', error);
      yield put(setApiCallFailed({error: error}));
    }
  }
  
  export function* musicFilesSaga() {
    console.log("musicFiles saga starterd");  
    //fetch real data
    yield takeLatest(GET_MUSIC_FILES, fetchFromRaspbery);
  }