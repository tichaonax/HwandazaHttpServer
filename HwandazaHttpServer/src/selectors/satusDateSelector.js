import {
    createSelector
} from 'reselect';

export const statusDateSelector = createSelector(
    state => state.get(`automation`),
    automation => automation.statusDate
);