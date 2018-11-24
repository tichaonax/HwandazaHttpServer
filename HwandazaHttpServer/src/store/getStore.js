import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import persistState from 'redux-localstorage';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from "redux-logger";

import { getDefaultState } from "../store/getDefaultState";
import { reducer } from "../reducers";
import { initSagas } from './initsagas';

const defaultState = getDefaultState();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // eslint-disable-line
const sagaMiddleware = createSagaMiddleware();

const enhancer = composeEnhancers(
  persistState('favoriteTracks', { key: 'hwandaza-automationX' }),
  applyMiddleware(sagaMiddleware, thunk),
);

const store = createStore(
  reducer,
  defaultState,
  enhancer,
  applyMiddleware(createLogger({
    stateTransformer: state => state.toJS(),
  })),
);

export const getStore = () => store;

initSagas(sagaMiddleware);
