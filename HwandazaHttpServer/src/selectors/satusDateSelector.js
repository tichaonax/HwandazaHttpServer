import {
    createSelector
} from 'reselect';

import { automationSelector } from './automationSelector';

export const statusDateSelector = createSelector(
    automationSelector,
    automationSelector =>  (automationSelector  && automationSelector.statusDate ? 
        automationSelector.statusDate:
        null)
);