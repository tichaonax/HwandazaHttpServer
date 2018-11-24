import { createAction } from "../utility";

export const LOAD_FAVORITE_TRACKS = `LOAD_FAVORITE_TRACKS`;
export const loadFavoriteTracks = createAction(LOAD_FAVORITE_TRACKS);

export const ADD_FAVORITE_TRACK = `ADD_FAVORITE_TRACK`;
export const addFavoriteTrack = createAction(ADD_FAVORITE_TRACK, `favoriteTrack`);

export const REMOVE_FAVORITE_TRACK = `REMOVE_FAVORITE_TRACK`;
export const removeFavoriteTrack = createAction(REMOVE_FAVORITE_TRACK, `favoriteTrack`);