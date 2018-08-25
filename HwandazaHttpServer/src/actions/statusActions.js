import { createAction } from "../utility";

export const GET_STATUS = `GET_STATUS`;

export const getStatus = createAction(GET_STATUS);

export const SET_STATUS = `SET_STATUS`;

export const setStatus = createAction(SET_STATUS, `status`);
