import { createAction } from "../utility";

export const SET_LOADING_STATUS = `SET_LOADING_STATUS`;

export const setLoadingStatus = createAction(SET_LOADING_STATUS, `loading`);