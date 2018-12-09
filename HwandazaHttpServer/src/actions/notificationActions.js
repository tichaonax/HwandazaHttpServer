import { createAction } from "../utility";

export const SET_NOTIFICATION_INFO = `SET_NOTIFICATION_INFO`;
export const setNotificationInfo = createAction(SET_NOTIFICATION_INFO, 'info');

export const SET_NOTIFICATION_ERROR = `SET_NOTIFICATION_ERROR`;
export const setNotificationError = createAction(SET_NOTIFICATION_ERROR, `error`);

export const SET_NOTIFICATION_WARN = `SET_NOTIFICATION_WARN`;
export const setNotificationWarn = createAction(SET_NOTIFICATION_WARN, 'warn');

export const SET_NOTIFICATION_SUCCESS = `SET_NOTIFICATION_SUCCESS`;
export const setNotificationSuccess = createAction(SET_NOTIFICATION_SUCCESS, `success`);

export const RESET_NOTIFICATIONS = `RESET_NOTIFICATIONS`;
export const resetNotifications = createAction(RESET_NOTIFICATIONS);