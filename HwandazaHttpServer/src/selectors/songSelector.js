import {
    createSelector
} from 'reselect';

import { mediaLibrarySelector } from './mediaLibrarySelector';

export const songSelector = createSelector(
    mediaLibrarySelector,
    mediaLibrarySelector => (mediaLibrarySelector && mediaLibrarySelector.songList ? {
        songList: mediaLibrarySelector.songList
        } : {
            songList: [
                {
                    Name: "Mutoro Warema",
                    Url: "Killer%20T/Bvunza%20Tinzwe/Mutoro%20Warema.m4a",
                },
                {
                    Name: "Kugara Newe",
                    Url: "Killer%20T/Bvunza%20Tinzwe/Kugara%20Newe.m4a",
                },
            ]
        }
    )
);