import format from "date-fns/format";
import {
    createSelector
} from 'reselect';

import { mediaLibrarySelector } from './mediaLibrarySelector';

export const videoSelector = createSelector(
    mediaLibrarySelector,
    mediaLibrarySelector => (mediaLibrarySelector && mediaLibrarySelector.videoList ? {
            videoList: mediaLibrarySelector.videoList
        } : {
            videoList: {
                statusDate: format(new Date(), "YYYY-MM-DD HH:mm:ss"),
                recordCount: 0,
                totalAvailable: 0,
                result:[],
            }
        }
    )
);