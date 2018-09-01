import {
    createSelector
} from 'reselect';

export const lightsSelector = createSelector(
    state => state.get(`automation`),
    automation => {
        const status = automation.status;
        return (status && status.lights) ? {
            status: status.lights
        } : {
            status: null
        };
    }
);