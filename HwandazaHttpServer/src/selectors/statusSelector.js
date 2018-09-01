import {
    createSelector
} from 'reselect';

export const statusSelector = () => createSelector(
    state => state.get(`automation`),
    automation => automation
);