import { createAction } from "../utility";

export const LOAD_MUSIC_ROOT_FOLDERS = `LOAD_MUSIC_ROOT_FOLDERS`;
export const loadMusicRootFolders = createAction(LOAD_MUSIC_ROOT_FOLDERS);

export const SET_MUSIC_ROOT_FOLDERS = `SET_MUSIC_ROOT_FOLDERS`;
export const setMusicRootFolders = createAction(SET_MUSIC_ROOT_FOLDERS, `rootFolders`);

export const LOAD_FOLDER_SONGS = `LOAD_FOLDER_SONGS`;
export const loadFolderSongs = createAction(LOAD_FOLDER_SONGS, `request`);
