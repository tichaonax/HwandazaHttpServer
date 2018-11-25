import {
    createSelector
} from 'reselect';

export const loadingSelector = createSelector(
    state => state.spinner,
    spinner => (spinner  && spinner.loading ? spinner.loading : false)
);