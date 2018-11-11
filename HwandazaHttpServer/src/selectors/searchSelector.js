import {
    createSelector
} from 'reselect';

export const searchSelector = createSelector(
    state => state.searchResult,
    searchResult => (searchResult && searchResult.songList ? {
            songList: searchResult.songList
        } : {
            songList: []
        }
    )
);