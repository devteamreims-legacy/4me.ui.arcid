import _ from 'lodash';
import prefix from './prefix';

const p = prefix('autocomplete');

export const getRaw = (state) => p(state);

export const getFlights = (state) => _.get(getRaw(state), 'flights', []);

export const isLoading = (state) => !!_.get(getRaw(state), 'isLoading', false);
