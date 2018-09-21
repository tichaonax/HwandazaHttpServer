import {
    createSelector
} from 'reselect';

export const systemUpTimeSelector = createSelector(
    state => state.get(`automation`),
    automation => automation.systemUpTime
);