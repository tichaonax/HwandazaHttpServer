import {
    createSelector
} from 'reselect';

export const songsSelector = createSelector(
    state => state.get(`musicFiles`),
    musicFiles => {
        const songs = musicFiles.mp3List;
        return (songs) ? {
            mp3List: songs
        } : {
            mp3List: []
        };
    }
);