import {
    createSelector
} from 'reselect';

import { automationSelector } from './automationSelector';

export const statusSelector = createSelector(
    automationSelector,
    automationSelector =>  (automationSelector  && automationSelector.status ? automationSelector.status : null)
);
