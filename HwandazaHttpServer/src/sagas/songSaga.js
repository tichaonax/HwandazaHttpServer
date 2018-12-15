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
    setLoadingStatus,
  } from "../actions";
  
  function* fetchFromRaspbery() {
    const url = `${Utils.getBaseUrl()}/hwandazaautomation/songs`;
    try {
      const response = yield call(fetch, url);
      const data = yield apply(response, response.json);
      yield put(setSongs(data));
      yield put(setLoadingStatus(false));
    } catch (error) {
      yield put(setApiCallFailed({error: error}));
    }
  }
  
  export function* songSaga() {
    console.log("song saga starterd");  
    //fetch real data
    yield takeLatest(GET_SONGS, fetchFromRaspbery);
  }