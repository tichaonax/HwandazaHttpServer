import {
    createSelector
} from 'reselect';

import { mediaLibrarySelector } from './mediaLibrarySelector';

export const pictureSelector = createSelector(
    mediaLibrarySelector,
    mediaLibrarySelector => (mediaLibrarySelector && mediaLibrarySelector.pictureList ? {
            pictureList: mediaLibrarySelector.pictureList
        } : {
            pictureList: []
        }
    )
);