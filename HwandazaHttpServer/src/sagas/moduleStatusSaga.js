import {
    apply,
    call,
    put,
    takeEvery,
} from "redux-saga/effects";

import fetch from 'isomorphic-fetch';

import {
    Utils
} from "../utility";


import {
    SET_MODULE_STATUS,
    setStatus,
    setApiCallFailed,
} from "../actions";

function* setModuleStatus(action) {
    try {
        const url = `${Utils.getBaseUrl()}/hwandazaautomation`;
        const options = Utils.buildPostFetchOptions(action.request);
        const response = yield call(fetch, url, options);
        const data = yield apply(response, response.json);
        yield put(setStatus(data));
    } catch (error) {
        //console.log('moduleStatusSaga Error API:', error);
        yield put(setApiCallFailed({error: error}));
    }
}

export function* moduleStatusSaga() {
    console.log("moduleStatusSaga saga starterd");
    yield takeEvery(SET_MODULE_STATUS, setModuleStatus);
}