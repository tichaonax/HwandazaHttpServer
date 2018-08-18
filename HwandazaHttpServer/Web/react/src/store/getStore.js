import { createStore, applyMiddleware } from "redux";

import { fromJS } from "immutable";

import { getDefaultState } from "../store/getDefaultState";

import { createLogger } from "redux-logger";

import { reducer } from "../reducers";

const defaultState = fromJS(getDefaultState());
const store = createStore(
  reducer,
  defaultState,
  applyMiddleware(
    createLogger({
      stateTransformer: state => state.toJS()
    })
  )
);

console.log("store.getState()", store.getState());
console.log("store.getState().toJS()", store.getState().toJS());
export const getStore = () => store;
