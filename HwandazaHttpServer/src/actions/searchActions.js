import { createAction } from "../utility";

export const SEARCH_AS_YOU_TYPE = `SEARCH_AS_YOU_TYPE`;
export const search = createAction(SEARCH_AS_YOU_TYPE, `request`);

export const SET_SEARCH_RESULT = `SET_SEARCH_RESULTS`;
export const setSearchResult = createAction(SET_SEARCH_RESULT, `songList`);
