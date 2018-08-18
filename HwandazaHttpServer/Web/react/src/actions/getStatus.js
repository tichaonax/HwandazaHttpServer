import { createAction } from "./../utility";

export const GET_STATUS = `GET_STATUS`;

export const getStatus = createAction(GET_STATUS, `status`);
