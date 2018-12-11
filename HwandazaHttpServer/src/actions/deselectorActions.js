
import { createAction } from "../utility";

export const SET_DESELECT_SEARCH_AS_YOU_TYPE = `SET_DESELECT_SEARCH_AS_YOU_TYPE`;
export const setDeselectSearchAsYouType = createAction(SET_DESELECT_SEARCH_AS_YOU_TYPE, 'status');

export const SET_DESELECT_ARTIST = `SET_DESELECT_ARTIST`;
export const setDeselectAsrtist = createAction(SET_DESELECT_ARTIST, 'status');
