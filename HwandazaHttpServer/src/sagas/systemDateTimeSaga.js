import {
    call,
    put,
    takeEvery,
} from "redux-saga/effects";

import fetch from 'isomorphic-fetch';

import {
    Utils
} from "../utility";

import {
    SET_SYSTEM_DATE_TIME,
    getStatus,
    setApiCallFailed,
} from "../actions";

function* setSystemDateTime(action) {
    try {
        const url = `${Utils.getBaseUrl()}/hwandazaautomation`;
        const options = Utils.buildPostFetchOptions(action.request);
        yield call(fetch, url, options);
        //dont care about the response but request new status
        yield put(getStatus());
    } catch (error) {
        yield put(setApiCallFailed({error: error}));
    }
}

export function* systemDateTimeSaga() {
    console.log("systemDateTimeSaga saga starterd");
    yield takeEvery(SET_SYSTEM_DATE_TIME, setSystemDateTime);
}