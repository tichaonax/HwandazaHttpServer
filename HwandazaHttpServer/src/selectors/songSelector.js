import format from "date-fns/format";
import {
    createSelector
} from 'reselect';

import { mediaLibrarySelector } from './mediaLibrarySelector';

export const songSelector = createSelector(
    mediaLibrarySelector,
    mediaLibrarySelector => (mediaLibrarySelector && mediaLibrarySelector.songList ? {
        songList: mediaLibrarySelector.songList
        } : {
            songList: 
            {
                statusDate: format(new Date(), "YYYY-MM-DD HH:mm:ss"),
                recordCount: 2,
                totalAvailable: 2,
                result:[
                {
                    Name: "Mutoro Warema",
                    Url: "Killer%20T/Bvunza%20Tinzwe/Mutoro%20Warema.m4a",
                },
                {
                    Name: "Kugara Newe",
                    Url: "Killer%20T/Bvunza%20Tinzwe/Kugara%20Newe.m4a",
                },
            ],
          }
        }
    )
);
