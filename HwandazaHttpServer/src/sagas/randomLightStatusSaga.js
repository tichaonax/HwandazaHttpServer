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
    SET_RANDOM_LIGHT_STATUS,
    setStatus,
    setApiCallFailed,
} from "../actions";

function* setRandomLightStatus(action) {
    try {
        const url = `${Utils.getBaseUrl()}/hwandazaautomation`;
        const options = Utils.buildPostFetchOptions(action.request);
        const response = yield call(fetch, url, options);
        const data = yield apply(response, response.json);
        yield put(setStatus(data));
    } catch (error) {
        yield put(setApiCallFailed({error: error}));
    }
}

export function* randomLightStatusSaga() {
    console.log("randomLightStatusSaga saga starterd");
    yield takeEvery(SET_RANDOM_LIGHT_STATUS, setRandomLightStatus);
}