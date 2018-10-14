import {
    createSelector
} from 'reselect';

export const galleryImagesSelector = createSelector(
    state => state.get(`galleryImages`),
    galleryImages => {
        const images = galleryImages.imageList;
        return (images) ? {
            imageList: images
        } : {
            imageList: []
        };
    }
);