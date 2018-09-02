import {
  apply,
  call,
  put,
  takeEvery
} from "redux-saga/effects";

import fetch from 'isomorphic-fetch';

import {
  Utils
} from "../utility";


import {
  GET_STATUS,
  setStatus
} from "../actions";

import {
  getMockStatusApi
} from '../services';

const newBaseUrl = Utils.getUrlAddress(window.location.href).replace(
  /\/+$/g,
  ""
);

function* fetchFromMockData(){
  const response = yield call(() => getMockStatusApi());
  console.log('mockdata', JSON.stringify(response.data));
  yield put(setStatus(response.data));
} 

function* fetchFromRaspbery(){
  const url = `${newBaseUrl}/hwandazaautomation/status`;
  const response = yield call(fetch, url);
  const data = yield apply(response, response.json);
  console.log("api response", JSON.stringify(data));
  yield put(setStatus(data));
}

export function* hwandaStatusSaga() {
  console.log("hwandaStatusSaga saga starterd");
  //fetch test data 
  //yield takeEvery(GET_STATUS, fetchFromMockData);

  //fetch real data
  yield takeEvery(GET_STATUS, fetchFromRaspbery);
}