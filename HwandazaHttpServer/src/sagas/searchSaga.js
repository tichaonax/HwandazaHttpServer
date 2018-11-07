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
    SEARCH_AS_YOU_TYPE,
    setSearchResult,
    setApiCallFailed,
} from "../actions";

function* search(action) {
    try {
        const url = `${Utils.getBaseUrl()}/hwandazaautomation`;
        const options = Utils.buildPostFetchOptions(action.request);
        const response = yield call(fetch, url, options);
        const data = yield apply(response, response.json);
        yield put(setSearchResult(data));
    } catch (error) {
        console.log('searchSaga Error API:', error);
        yield put(setApiCallFailed({error: error}));
    }
}

export function* searchSaga() {
    console.log("search saga starterd");
    yield takeEvery(SEARCH_AS_YOU_TYPE, search);
}