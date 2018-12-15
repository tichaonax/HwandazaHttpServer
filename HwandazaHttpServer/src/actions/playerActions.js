import { createAction } from "../utility";

export const LOAD_FAVORITE_TRACKS = `LOAD_FAVORITE_TRACKS`;
export const loadFavoriteTracks = createAction(LOAD_FAVORITE_TRACKS);

export const ADD_FAVORITE_TRACK = `ADD_FAVORITE_TRACK`;
export const addFavoriteTrack = createAction(ADD_FAVORITE_TRACK, `favoriteTrack`);

export const REMOVE_FAVORITE_TRACK = `REMOVE_FAVORITE_TRACK`;
export const removeFavoriteTrack = createAction(REMOVE_FAVORITE_TRACK, `favoriteTrack`);

export const LOAD_MUSIC_ROOT_FOLDERS = `LOAD_MUSIC_ROOT_FOLDERS`;
export const loadMusicRootFolders = createAction(LOAD_MUSIC_ROOT_FOLDERS);

export const SET_MUSIC_ROOT_FOLDERS = `SET_MUSIC_ROOT_FOLDERS`;
export const setMusicRootFolders = createAction(SET_MUSIC_ROOT_FOLDERS, `rootFolders`);

export const LOAD_FOLDER_SONGS = `LOAD_FOLDER_SONGS`;
export const loadFolderSongs = createAction(LOAD_FOLDER_SONGS, `request`);

export const SET_DESELECT_SEARCH_AS_YOU_TYPE = `SET_DESELECT_SEARCH_AS_YOU_TYPE`;
export const setDeselectSearchAsYouType = createAction(SET_DESELECT_SEARCH_AS_YOU_TYPE, 'status');

export const SET_DESELECT_ARTIST = `SET_DESELECT_ARTIST`;
export const setDeselectAsrtist = createAction(SET_DESELECT_ARTIST, 'status');

export const SET_LOAD_SONGS_ON_LIST_FINISHED = `SET_LOAD_SONGS_ON_LIST_FINISHED`;
export const setLoadSongsOnListFinished = createAction(SET_LOAD_SONGS_ON_LIST_FINISHED, 'loadMore');

export const GET_RANDOM_TRACK_COVER = `GET_RANDOM_TRACK_COVER`;
export const getRandomTrackCover = createAction(GET_RANDOM_TRACK_COVER);

export const SET_RANDOM_TRACK_COVER = `SET_RANDOM_TRACK_COVER`;
export const setRandomTrackCover = createAction(SET_RANDOM_TRACK_COVER, 'cover');