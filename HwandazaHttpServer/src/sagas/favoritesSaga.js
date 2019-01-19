import format from "date-fns/format";

import {
    select,
    put,
    takeLatest,
  } from "redux-saga/effects";
  
  import {
    LOAD_FAVORITE_TRACKS,
    setSongs,
    setApiCallFailed,
  } from "../actions";

  import {
    favoritesSelector,
  } from "../selectors";
  
  function* loadFavorites() {
    try {
      const { songList } = yield select(favoritesSelector);
      const songs= {
        statusDate: format(new Date(), "YYYY-MM-DD HH:mm:ss"),
        recordCount: songList.length,
        totalAvailable: songList.length,
        result: songList,
      };

      yield put(setSongs(songs));
    } catch (error) {
      yield put(setApiCallFailed({error: error}));
    }
  }
  
  export function* favoritesSaga() {
    console.log("favoritesSaga starterd");  
    yield takeLatest(LOAD_FAVORITE_TRACKS, loadFavorites);
  }