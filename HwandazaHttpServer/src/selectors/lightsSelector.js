import {
    createSelector
} from 'reselect';

import { statusSelector } from './statusSelector';

export const lightsSelector = createSelector(
    statusSelector,
    statusSelector => (statusSelector && statusSelector.lights ? {
            status: statusSelector.lights } : {
            status: {
                m1: 0,
                m1LastUpdate: "2019-01-24 04:11:07 PM",
                m2: 0,
                m2LastUpdate: "2019-01-24 04:11:07 PM",
                l3: 0,
                l3LastUpdate: "2019-01-24 04:11:07 PM",
                l4: 0,
                l4LastUpdate: "2019-01-24 04:11:07 PM",
                l5: 0,
                l5LastUpdate: "2019-01-24 04:11:07 PM",
                l6: 0,
                l6LastUpdate: "2019-01-24 04:11:07 PM"
            }
        })
);