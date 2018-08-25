import { createAction } from "../utility";

export const SET_NAV_PAGE = `SET_NAV_PAGE`;

export const setNavPage = createAction(SET_NAV_PAGE, `navpage`);

export const SHOW_NAV_PAGE = `SHOW_NAV_PAGE`;

export const showNavPage = createAction(SHOW_NAV_PAGE, `shownavpage`);