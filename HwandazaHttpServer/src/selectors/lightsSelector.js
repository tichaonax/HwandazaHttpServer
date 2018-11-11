import {
    createSelector
} from 'reselect';

import { statusSelector } from './statusSelector';

export const lightsSelector = createSelector(
    statusSelector,
    statusSelector => (statusSelector && statusSelector.lights ? {
            status: statusSelector.lights } : {
            status: null
        })
);