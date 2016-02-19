import { partialResults } from '../stub-data/';
import { errorMultiple as profileErrorMultiple, getProfile } from './profile';
import { add as globalError, clear as globalErrorClear } from './errors';

import _ from 'lodash';

export const ARCID_QUERY_START = 'ARCID_QUERY_START'
export const ARCID_QUERY_COMPLETE = 'ARCID_QUERY_COMPLETE'
export const ARCID_QUERY_FAIL = 'ARCID_QUERY_FAIL'

// Fetches flights from callsign
// Uses redux thunk
export function getFlights(callsign) {
  return (dispatch, getState) => {
    dispatch(start(callsign));
    setTimeout(() => {
      let results = _.filter(partialResults, (f) => f.callsign.toUpperCase() === callsign.toUpperCase());
      if(_.isEmpty(results)) {
        dispatch(errorNotFound(callsign));
      } else {
        if(results.length === 1) {
          dispatch(completeSingle(results[0]));
        } else {
          dispatch(completeMultiple(results));
        }
      }
      return;
    }, 2000);
  }
}

export function errorNotFound(callsign) {
  return (dispatch, getState) => {
    dispatch(error());
    dispatch(globalError(`[${callsign}]: Flight not found`));
  };
}

export function error() {
  return {
    type: ARCID_QUERY_FAIL
  };
}

export function start(callsign) {
  return {
    type: ARCID_QUERY_START,
    callsign,
  };
}


function complete(flights) {
  return {
    type: ARCID_QUERY_COMPLETE,
    flights
  };
}

// Multiple flights loaded, invite user to select one
export function completeMultiple(flights) {
  return (dispatch, getState) => {
    let callsign = getState().results.query;
    dispatch(profileErrorMultiple(callsign));
    dispatch(complete(flights))
  };
}

// Single flight loaded, start profile loading right away
export function completeSingle(flight) {
  return (dispatch, getState) => {
    dispatch(complete([flight]));
    dispatch(getProfile(flight.flightId));
  }
}