import { createAction } from "../utility";

export const API_CALL_FAILED = `API_CALL_FAILED`;

export const setApiCallFailed = createAction(API_CALL_FAILED, `error`);