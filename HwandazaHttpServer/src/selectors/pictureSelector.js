import moment from "moment";
import {
    createSelector
} from 'reselect';

import { mediaLibrarySelector } from './mediaLibrarySelector';

export const pictureSelector = createSelector(
    mediaLibrarySelector,
    mediaLibrarySelector => (mediaLibrarySelector && mediaLibrarySelector.pictureList ? {
            pictureList: mediaLibrarySelector.pictureList
        } : {
            pictureList: {
                statusDate: moment().format("YYYY-MM-DD HH:mm:ss"),
                recordCount: 0,
                totalAvailable: 0,
                result:[],
            }
        }
    )
);