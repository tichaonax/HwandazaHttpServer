import {
  apply,
  call,
  put,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import fetch from 'isomorphic-fetch';

import {
  Utils
} from "../utility";


import {
  GET_STATUS,
  setStatus,
  setApiCallFailed,
} from "../actions";

import {
  getMockStatusApi
} from '../services';

function* fetchFromMockData() {
  const response = yield call(() => getMockStatusApi());
  yield put(setStatus(response.data));
}

function* fetchFromRaspbery() {
  const url = `${Utils.getBaseUrl()}/hwandazaautomation/status`;
  try {
    const response = yield call(fetch, url);
    const data = yield apply(response, response.json);
    yield put(setStatus(data));
  } catch (error) {
    yield put(setApiCallFailed({error: error}));
  }
}

export function* hwandaStatusSaga() {
  console.log("hwandaStatusSaga saga starterd");
  //fetch test data 
  //yield takeEvery(GET_STATUS, fetchFromMockData);

  //fetch real data
  yield takeLatest(GET_STATUS, fetchFromRaspbery);
}