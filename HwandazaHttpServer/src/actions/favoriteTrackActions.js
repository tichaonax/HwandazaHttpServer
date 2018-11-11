import { createAction } from "../utility";

export const LOAD_FAVORITE_TRACKS = `LOAD_FAVORITE_TRACKS`;
export const loadFavoriteTracks = createAction(LOAD_FAVORITE_TRACKS);

export const SET_FAVORITE_TRACK = `SET_FAVORITE_TRACK`;
export const setFavoriteTrack = createAction(SET_FAVORITE_TRACK, `favoriteTrack`);