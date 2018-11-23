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
} from "../actions";

function* getMusicRootFolders(action) {
    try {
        console.log('musicRootFoldersSaga saga', action);
        const url = `${Utils.getBaseUrl()}/hwandazaautomation`; 
        const request = {
            Command : "rootfolders",
       }
        const options = Utils.buildPostFetchOptions(request);
        const response = yield call(fetch, url, options);
        const data = yield apply(response, response.json);
        console.log("musicRootFoldersSaga api response", data);
        yield put(setMusicRootFolders(data));
    } catch (error) {
        console.log('musicRootFoldersSaga Error API:', error);
        yield put(setApiCallFailed({error: error}));
    }
}

export function* musicRootFoldersSaga() {
    console.log("musicRootFoldersSaga starterd");
    yield takeEvery(LOAD_MUSIC_ROOT_FOLDERS, getMusicRootFolders);
}