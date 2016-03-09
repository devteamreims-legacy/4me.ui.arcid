import { singleResult } from '../stub-data/';
import _ from 'lodash';
import { add as globalError, clear as globalErrorClear } from './errors';

export const PROFILE_QUERY_START = 'PROFILE_QUERY_START';
export const PROFILE_QUERY_COMPLETE = 'PROFILE_QUERY_COMPLETE';
export const PROFILE_QUERY_FAIL = 'PROFILE_QUERY_FAIL';
export const PROFILE_QUERY_MULTIPLE = 'PROFILE_QUERY_MULTIPLE';

import axios from 'axios';
import api from '../api';

// Fetches a single flight
// Uses redux thunk
export function getProfile(ifplId, forceRefresh = false) {
  return (dispatch, getState) => {
    // Here we expect our flightId to be present in state.results.flights
    let flight = _.find(getState().results.flights, (f) => f.ifplId === ifplId);
    
    if(_.isEmpty(flight)) {
      console.log('Should not happen');
      dispatch(errorNotFound(ifplId));
      return;
    }

    dispatch(start(ifplId));

    const apiUrl = api.rootPath + api.arcid.searchProfile;
    const reqParams = {ifplId};
    
    if(forceRefresh) {
      Object.assign(reqParams, {forceRefresh: true});
    }

    return axios.get(apiUrl, {params: reqParams})
      .then((response) => {
        console.log(response);

        const results = response.data;

        if(_.isEmpty(results)) {
          return dispatch(errorNotFound(ifplId));
        }



        return dispatch(complete(results));

      })
      .catch((err) => {
        return dispatch(error(err));
      });
  }
}

export function errorNotFound(ifplId, callsign = '') {
  return (dispatch, getState) => {
    dispatch(globalError(`[id:${ifplId}/${callsign}]: Flight not found`));
    dispatch(error());
  };
}

export function errorMultiple(callsign) {
  return (dispatch, getState) => {
    dispatch(globalError(`[${callsign}]: Multiple results, please select one`));
    dispatch(error());
  }
}

export function error() {
  return {
    type: PROFILE_QUERY_FAIL
  };
}

export function start(ifplId) {
  return (dispatch, getState) => {
    dispatch(globalErrorClear());
    dispatch({
      type: PROFILE_QUERY_START,
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
    dispatch(globalErrorClear());
    dispatch({
      type: PROFILE_QUERY_COMPLETE,
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