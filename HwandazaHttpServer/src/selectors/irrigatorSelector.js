import {
    createSelector
} from 'reselect';

export const irrigatorSelector = createSelector(
    state => state.get(`automation`),
    automation => {
        const status = automation.status;
        return (status && status.modules) ? {
            status: status.modules.Irrigator
        } : {
            status: null
        };
    }
);