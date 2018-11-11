import {
    createSelector
} from 'reselect';

export const navSelector = createSelector(
    state => state.navigation,
    navigation => (navigation  && navigation.shownavpage ? navigation.shownavpage : null)
);