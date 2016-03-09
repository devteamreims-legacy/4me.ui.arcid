import _ from 'lodash';


const p = (state) => _.get(state, 'profile');

export const getProfile = (state) => p(state);

export const isLoading = (state) => !!_.get(p(state), 'isLoading', false);

export const getSelectedIfplId = (state) => _.get(p(state), 'ifplId');

export const getProfileData = (state) => _.get(p(state), 'data', {});

export const isEmpty = (state) => _.isEmpty(getProfileData(state));

export const getCallsign = (state) => _.get(getProfileData(state), 'callsign', '');
export const getDeparture = (state) => _.get(getProfileData(state), 'departure', '');
export const getDestination = (state) => _.get(getProfileData(state), 'destination', '');
export const getEobt = (state) => _.get(getProfileData(state), 'eobt');
export const getPointProfile = (state) => _.get(getProfileData(state), 'pointProfile', []);
export const getLastUpdated = (state) => _.get(getProfileData(state), 'fetched', 0);
export const getDelay = (state) => _.get(getProfileData(state), 'delay', 0);