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
    LOAD_MUSIC_ROOT_FOLDERS,
    setMusicRootFolders,
    setApiCallFailed,
    setLoadingStatus,
} from "../actions";

function* getMusicRootFolders(action) {
    try {
        const url = `${Utils.getBaseUrl()}/hwandazaautomation`; 
        const request = {
            Command : "rootfolders",
       }
        const options = Utils.buildPostFetchOptions(request);
        const response = yield call(fetch, url, options);
        const data = yield apply(response, response.json);
        yield put(setMusicRootFolders(data));
        yield put(setLoadingStatus(false));
    } catch (error) {
        yield put(setApiCallFailed({error: error}));
    }
}

export function* musicRootFoldersSaga() {
    console.log("musicRootFoldersSaga starterd");
    yield takeEvery(LOAD_MUSIC_ROOT_FOLDERS, getMusicRootFolders);
}