import { createAction } from "../utility";

export const GET_PICTURES = `GET_PICTURES`;

export const getPictures = createAction(GET_PICTURES);

export const SET_PICTURES = `SET_PICTURES`;

export const setPictures = createAction(SET_PICTURES, `pictureList`);

export const GET_VIDEOS = `GET_VIDEOS`;

export const getVideos = createAction(GET_VIDEOS);

export const SET_VIDEOS = `SET_VIDEOS`;

export const setVideos = createAction(SET_VIDEOS, `videoList`);

export const GET_SONGS = `GET_SONGS`;

export const getSongs = createAction(GET_SONGS);

export const SET_SONGS = `SET_SONGS`;

export const setSongs = createAction(SET_SONGS, `songList`);