import {
    apply,
    call,
    put,
    take,
    takeEvery,
    takeLatest,
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

function buildFetchOptions(action) {
    return {
        method: "POST",
        body: JSON.stringify(action.command),
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    }
}

function* sendCommnadToRaspberryPi(action) {
    //console.log('sendCommnadToRaspberryPi', action);
    try {
        const url = `${Utils.getBaseUrl()}/hwandazaautomation`;
        const options = buildFetchOptions(action);
        console.log('fetch options', options);
        const response = yield call(fetch, url, options);
        const data = yield apply(response, response.json);
        console.log("Commnad To RaspberryPi response", JSON.stringify(data));
        yield put(setStatus(data));
    } catch (error) {
        console.log('Error API:', error);
        yield put(setApiCallFailed({error: error.message}));
    }
}

export function* moduleStatusSaga() {
    console.log("moduleStatusSaga saga starterd");
    yield takeEvery(SET_MODULE_STATUS, sendCommnadToRaspberryPi);
}