import {
    createSelector
} from 'reselect';

export const pictureSelector = createSelector(
    state => state.get(`mediaLibrary`),
    mediaLibrary => {
        const pictures = mediaLibrary.pictureList;
        console.log('pictureSelector', pictures);
        return (pictures) ? {
            pictureList: pictures
        } : {
            pictureList: []
        };
    }
);