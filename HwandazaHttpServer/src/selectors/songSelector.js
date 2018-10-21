import {
    createSelector
} from 'reselect';

export const songSelector = createSelector(
    state => state.get(`mediaLibrary`),
    mediaLibrary => {
        const songs = mediaLibrary.songList;
        console.log('songeSelector', songs);
        return (songs) ? {
            songList: songs
        } : {
            songList: []
        };
    }
);