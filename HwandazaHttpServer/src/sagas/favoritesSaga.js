import moment from "moment";

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
      const favorites = yield select(favoritesSelector);
      const songList= {
        statusDate: moment().format("YYYY-MM-DD HH:mm:ss"),
        recordCount: favorites.size,
        totalAvailable: favorites.size,
        result: favorites,
      };
      
      yield put(setSongs(songList));
    } catch (error) {
      yield put(setApiCallFailed({error: error}));
    }
  }
  
  export function* favoritesSaga() {
    console.log("favoritesSaga starterd");  
    yield takeLatest(LOAD_FAVORITE_TRACKS, loadFavorites);
  }