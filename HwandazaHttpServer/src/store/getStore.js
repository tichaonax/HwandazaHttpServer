import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { persistState } from 'redux-devtools';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from "immutable";
import { createLogger } from "redux-logger";

import { getDefaultState } from "../store/getDefaultState";
import { reducer } from "../reducers";
import { DevTools } from '../components/DevTools/DevTools';
import { getDebugSessionKey } from '../utility';
import { initSagas } from './initsagas';

const defaultState = fromJS(getDefaultState());
const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
  applyMiddleware(
      sagaMiddleware,
      thunk,
  ),
  DevTools.instrument(),
  persistState(getDebugSessionKey())
);

const store = createStore(
  reducer,
  defaultState,
  enhancer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    createLogger({
      stateTransformer: state => state.toJS()
    })
  )
);

export const getStore = () => store;

initSagas(sagaMiddleware);
