import {
    createSelector
} from 'reselect';

export const automationSelector = createSelector(
    state => state.automation,
    automation => automation,
);
