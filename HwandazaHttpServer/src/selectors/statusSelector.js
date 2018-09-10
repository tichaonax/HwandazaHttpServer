import {
    createSelector
} from 'reselect';

export const statusSelector = createSelector(
    state => state.get(`automation`),
    automation => {
        const status = automation.status;
        return status;
    }
);