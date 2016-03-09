import _ from 'lodash';


const p = (state) => _.get(state, 'results');

export const isLoading = (state) => !!_.get(p(state), 'isLoading', false);

export const getFlights = (state) => _.get(p(state), 'flights', []);