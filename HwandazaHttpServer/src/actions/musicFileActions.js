import { createAction } from "../utility";

export const GET_MUSIC_FILES = `GET_MUSIC_FILES`;

export const getMusicFiles = createAction(GET_MUSIC_FILES);

export const SET_MUSIC_FILES = `SET_MUSIC_FILES`;

export const setMusicFiles = createAction(SET_MUSIC_FILES, `mp3List`);
