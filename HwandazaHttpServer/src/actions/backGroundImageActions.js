import { createAction } from "../utility";

export const GET_RANDOM_BACKGROUND_IMAGE = `GET_RANDOM_BACKGROUND_IMAGE`;
export const getRandomBackGroundImage = createAction(GET_RANDOM_BACKGROUND_IMAGE);

export const SET_RANDOM_BACKGROUND_IMAGE = `SET_RANDOM_BACKGROUND_IMAGE`;
export const setRandomBackGroundImage = createAction(SET_RANDOM_BACKGROUND_IMAGE, 'backgroundImage');