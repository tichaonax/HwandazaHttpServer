import { createAction } from "../utility";

export const GET_STATUS = `GET_STATUS`;
export const getStatus = createAction(GET_STATUS);

export const SET_STATUS = `SET_STATUS`;
export const setStatus = createAction(SET_STATUS, `automation`);

export const RANDOM_TOGGLE_STATUS =  `RANDOM_TOGGLE_STATUS`;
export const randomToggleStatus = createAction(RANDOM_TOGGLE_STATUS);

export const SET_RANDOM_LIGHT_STATUS =  `SET_RANDOM_LIGHT_STATUS`;
export const setRandomLightStatus = createAction(SET_RANDOM_LIGHT_STATUS, `request`);

export const SET_MODULE_STATUS = `SET_MODULE_STATUS`;
export const setModuleStatus = createAction(SET_MODULE_STATUS, `request`);

export const SET_SYSTEM_DATE_TIME = `SET_SYSTEM_DATE_TIME`;
export const setSyatemDateTime = createAction(SET_SYSTEM_DATE_TIME, `request`);
