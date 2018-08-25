import { call, put, takeEvery } from "redux-saga/effects";

import { GET_STATUS, setStatus } from "../actions";
import { getStatusApi } from '../services';

function* fetchStatus() {
  const response = yield call(() => getStatusApi());
  console.log("api response>", response);
  yield put(setStatus(response.data));
}

export function* hwandaStatusSaga() {
  console.log("hwandaStatusSaga saga starterd");
  yield takeEvery(GET_STATUS, fetchStatus);
}
