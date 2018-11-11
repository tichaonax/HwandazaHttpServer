import {
    createSelector
} from 'reselect';

export const mediaLibrarySelector = createSelector(
    state => state.mediaLibrary,
    mediaLibrary => mediaLibrary,
);
