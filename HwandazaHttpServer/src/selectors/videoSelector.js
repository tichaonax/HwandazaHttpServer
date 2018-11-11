import {
    createSelector
} from 'reselect';

import { mediaLibrarySelector } from './mediaLibrarySelector';

export const videoSelector = createSelector(
    mediaLibrarySelector,
    mediaLibrarySelector => (mediaLibrarySelector && mediaLibrarySelector.videoList ? {
            videoList: mediaLibrarySelector.videoList
        } : {
            videoList: []
        }
    )
);