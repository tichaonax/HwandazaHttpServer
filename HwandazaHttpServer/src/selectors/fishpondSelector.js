import {
    createSelector
} from 'reselect';

export const fishpondSelector = createSelector(
    state => state.get(`automation`),
    automation => {
        const status = automation.status;
        return (status && status.modules) ? {
            status: status.modules.fishPond
        } : {
            status: null
        };
    }
);