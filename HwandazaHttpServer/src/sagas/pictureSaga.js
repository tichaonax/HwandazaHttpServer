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
    GET_PICTURES,
    setPictures,
    setApiCallFailed,
  } from "../actions";
  
  function* fetchFromRaspbery() {
    const url = `${Utils.getBaseUrl()}/hwandazaautomation/pictures`;
    try {
      const response = yield call(fetch, url);
      const data = yield apply(response, response.json);
      yield put(setPictures(data));
    } catch (error) {
      yield put(setApiCallFailed({error: error}));
    }
  }
  
  export function* pictureSaga() {
    console.log("picture saga starterd");  
    //fetch real data
    yield takeLatest(GET_PICTURES, fetchFromRaspbery);
  }