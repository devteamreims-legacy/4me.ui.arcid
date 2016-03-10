import _ from 'lodash';


const p = (state) => _.get(state, 'profile');

export const getRaw = (state) => p(state);

export const isLoading = (state) => !!_.get(getRaw(state), 'isLoading', false);

export const getSelectedIfplId = (state) => _.get(getRaw(state), 'ifplId');

export const getProfile = (state) => _.get(getRaw(state), 'data', {});

export const isEmpty = (state) => _.isEmpty(getProfile(state));

export const getCallsign = (state) => _.get(getProfile(state), 'callsign', '');
export const getDeparture = (state) => _.get(getProfile(state), 'departure', '');
export const getDestination = (state) => _.get(getProfile(state), 'destination', '');
export const getEobt = (state) => _.get(getProfile(state), 'eobt');
export const getPointProfile = (state) => _.get(getProfile(state), 'pointProfile', []);
export const getLastUpdated = (state) => _.get(getProfile(state), 'fetched', 0);
export const getDelay = (state) => _.get(getProfile(state), 'delay', 0);

export const getError = (state) => _.get(getRaw(state), 'error', null);
export const isErrored = (state) => getError(state) !== null;
