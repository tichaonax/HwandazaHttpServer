import {
    createSelector
} from 'reselect';

import { modulesSelector } from './modulesSelector';

export const irrigatorSelector = createSelector(
    modulesSelector,
    modulesSelector => (modulesSelector && modulesSelector.modules ? {
            status: modulesSelector.modules.irrigator
        } : {
            status: null
        })
);