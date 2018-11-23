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
    LOAD_FOLDER_SONGS,
    setSongs,
    setApiCallFailed,
} from "../actions";

function* loadSongs(action) {
    try {
        const url = `${Utils.getBaseUrl()}/hwandazaautomation`;
        const options = Utils.buildPostFetchOptions(action.request);
        const response = yield call(fetch, url, options);
        const data = yield apply(response, response.json);
        yield put(setSongs(data));
    } catch (error) {
        //console.log('loadFolderSongsSaga Error API:', error);
        yield put(setApiCallFailed({error: error}));
    }
}

export function* loadFolderSongsSaga() {
    console.log("loadFolderSongsSaga starterd");
    yield takeEvery(LOAD_FOLDER_SONGS, loadSongs);
}