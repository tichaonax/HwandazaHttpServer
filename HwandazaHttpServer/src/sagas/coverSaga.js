    import {
        apply,
        call,
        put,
        takeLatest,
      } from "redux-saga/effects";
      
      import fetch from 'isomorphic-fetch';
      
      import {
        Utils
      } from "../utility";
      
      import {
        GET_RANDOM_TRACK_COVER,
        setRandomTrackCover,
        setApiCallFailed,
      } from "../actions";
      
      function* fetchFromRaspbery() {
        const url = `${Utils.getBaseUrl()}/hwandazaautomation/cover`;
        try {
          const response = yield call(fetch, url);
          const data = yield apply(response, response.json);
          yield put(setRandomTrackCover(data));
        } catch (error) {
          yield put(setApiCallFailed({error: error}));
        }
      }
      
      export function* coverSaga() {
        console.log("cover saga starterd");  
        yield takeLatest(GET_RANDOM_TRACK_COVER, fetchFromRaspbery);
      }