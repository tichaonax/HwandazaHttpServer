import { createAction } from "../utility";

export const GET_STATUS = `GET_STATUS`;
export const getStatus = createAction(GET_STATUS);

export const SET_STATUS = `SET_STATUS`;
export const setStatus = createAction(SET_STATUS, `automation`);

export const RANDOM_TOGGLE_STATUS =  `RANDOM_TOGGLE_STATUS`;
export const randomToggleStatus = createAction(RANDOM_TOGGLE_STATUS);

export const SET_MODULE_STATUS = `SET_MODULE_STATUS`;
export const setModuleStatus = createAction(SET_MODULE_STATUS, `command`);
