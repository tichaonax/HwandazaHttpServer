import {
    createSelector
} from 'reselect';

export const waterpumpSelector = createSelector(
    state => state.get(`automation`),
    automation => {
        const status = automation.status;
        return (status && status.modules) ? {
            status: status.modules.WaterPump
        } : {
            status: null
        };
    }
);