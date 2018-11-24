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
      console.log('favorites', favorites);
      yield put(setSongs(favorites));
    } catch (error) {
      console.log('favoritesSaga Error API:', error);
      yield put(setApiCallFailed({error: error}));
    }
  }
  
  export function* favoritesSaga() {
    console.log("favoritesSaga starterd");  
    yield takeLatest(LOAD_FAVORITE_TRACKS, loadFavorites);
  }