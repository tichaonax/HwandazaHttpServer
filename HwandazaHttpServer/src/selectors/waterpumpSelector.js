import {
    createSelector
} from 'reselect';

import { modulesSelector } from './modulesSelector';

export const waterpumpSelector = createSelector(
    modulesSelector,
    modulesSelector => (modulesSelector && modulesSelector.modules ? {
            status: modulesSelector.modules.waterPump
        } : {
            status: null
        })
);
