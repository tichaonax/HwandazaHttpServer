import {
    createSelector
} from 'reselect';

export const videoSelector = createSelector(
    state => state.get(`mediaLibrary`),
    mediaLibrary => {
        const vedeos = mediaLibrary.videoList;
        console.log('videoSelector', vedeos);
        return (vedeos) ? {
            videoList: vedeos
        } : {
            videoList: []
        };
    }
);