import { call, put, takeEvery } from "redux-saga/effects";

import { GET_STATUS, setStatus } from "../actions";
import { getStatusApi, getMockStatusApi } from '../services';

function* fetchStatus() {
  //const response = yield call(() => getStatusApi());
  const response = yield call(() => getMockStatusApi());
  console.log("api response>", JSON.stringify(response));
  yield put(setStatus(response.data));
}

export function* hwandaStatusSaga() {
  console.log("hwandaStatusSaga saga starterd");
  yield takeEvery(GET_STATUS, fetchStatus);
}
