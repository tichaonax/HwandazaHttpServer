import {
    createSelector
} from 'reselect';

export const searchSelector = createSelector(
    state => state.get(`searchResult`),
    searchResult => {
        const songs = searchResult.songList;
        //console.log('searchSelector', songs);
        return (songs) ? {
            songList: songs
        } : {
            songList: []
        };
    }
);