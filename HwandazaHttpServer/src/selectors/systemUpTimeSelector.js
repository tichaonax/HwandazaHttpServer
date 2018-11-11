import {
    createSelector
} from 'reselect';

import { automationSelector } from './automationSelector';

export const systemUpTimeSelector = createSelector(
    automationSelector,
    automationSelector =>  (automationSelector  && automationSelector.systemUpTime ? automationSelector.systemUpTime : null)
);