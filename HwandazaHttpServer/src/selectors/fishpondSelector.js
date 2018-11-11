import {
    createSelector
} from 'reselect';

import { modulesSelector } from './modulesSelector';

export const fishpondSelector = createSelector(
    modulesSelector,
    modulesSelector => (modulesSelector && modulesSelector.modules ? {
            status: modulesSelector.modules.fishPond
        } : {
            status: null
        })
);