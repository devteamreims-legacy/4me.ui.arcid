import _ from 'lodash';
import prefix from './prefix';

const p = prefix('query');

export const getQuery = (state) => p(state);

export const getQueryCallsign = (state) => _.get(getQuery(state), 'callsign', '');

export const getResults = (state) => _.get(getQuery(state), 'results', []);

export const isLoading = (state) => !!_.get(getQuery(state), 'isLoading', false);

export const getError = (state) => _.get(getQuery(state), 'error', null);

export const isErrored = (state) => !!getError(state);

export const hasMultipleResults = (state) => _.size(getResults(state)) > 1;

export const hasNoResults = (state) => _.size(getResults(state)) === 0;
