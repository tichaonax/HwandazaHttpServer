import {
    createSelector
} from 'reselect';

import { statusSelector } from './statusSelector';

export const modulesSelector = createSelector(
    statusSelector,
    statusSelector => (statusSelector && statusSelector.modules ? {
            modules: statusSelector.modules
        } : {
            modules: null
        })
);
