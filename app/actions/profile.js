import _ from 'lodash';


export const START = 'arcid/profile/START';
export const COMPLETE = 'arcid/profile/COMPLETE';
export const FAIL = 'arcid/profile/FAIL';

import axios from 'axios';
import api from '../api';

// Fetches a single flight
// Uses redux thunk
export function getProfile(ifplId, forceRefresh = false) {
  return (dispatch, getState) => {
    dispatch(start(ifplId));

    const apiUrl = api.rootPath + api.arcid.searchProfile;
    const reqParams = {ifplId};

    if(forceRefresh) {
      Object.assign(reqParams, {forceRefresh: true});
    }

    return axios.get(apiUrl, {params: reqParams})
      .then((response) => {
        const results = response.data;

        if(_.isEmpty(results)) {
          return dispatch(errorNotFound(ifplId));
        }

        return dispatch(complete(results));

      })
      .catch((err) => {
        if(err.status = 404) {
          return dispatch(error(`${ifplId} : Flight plan not found`, err));
        }
        return dispatch(error(null, err));
      });
  }
}

export function errorNotFound(ifplId, callsign = '') {
  return (dispatch, getState) => {
    dispatch(error());
  };
}

export function error(err, rawError) {
  return {
    type: FAIL,
    error: err || 'Could not contact arcid backend',
    rawError
  };
}

export function start(ifplId) {
  return (dispatch, getState) => {
    dispatch({
      type: START,
      ifplId
    });
  };
}

export function complete(profile = {}) {
  let {
    ifplId,
    callsign,
    departure,
    destination,
    eobt,
    delay,
    pointProfile,
    airspaceProfile,
    fetched,
  } = profile;

  return (dispatch, getState) => {
    dispatch({
      type: COMPLETE,
      ifplId,
      callsign,
      departure,
      destination,
      eobt,
      delay,
      pointProfile,
      airspaceProfile,
      fetched
    });
  };
}
