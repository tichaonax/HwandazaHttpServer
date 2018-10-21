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
    GET_SONGS,
    setSongs,
  } from "../actions";
  
  function* fetchFromRaspbery() {
    const url = `${Utils.getBaseUrl()}/hwandazaautomation/songs`;
    try {
      const response = yield call(fetch, url);
      const data = yield apply(response, response.json);
      console.log("songSaga api response", data);
      yield put(setSongs(data));
    } catch (error) {
      console.log('Error API:', error);
      yield put(setApiCallFailed({error: error}));
    }
  }
  
  export function* songSaga() {
    console.log("song saga starterd");  
    //fetch real data
    yield takeLatest(GET_SONGS, fetchFromRaspbery);
  }