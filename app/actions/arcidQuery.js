import { errorMultiple as profileErrorMultiple, getProfile } from './profile';
import { add as globalError, clear as globalErrorClear } from './errors';

import _ from 'lodash';

import axios from 'axios';
import api from '../api';

export const ARCID_QUERY_START = 'ARCID_QUERY_START'
export const ARCID_QUERY_COMPLETE = 'ARCID_QUERY_COMPLETE'
export const ARCID_QUERY_FAIL = 'ARCID_QUERY_FAIL'

// Fetches flights from callsign
// Uses redux thunk
export function getFlights(callsign) {
  return (dispatch, getState) => {
    // Check if loading
    const isLoading = getState().results.isLoading;

    if(isLoading) {
      console.log('Already loading !!');
      return;
    }

    if(!callsign) {
      console.log('arcidQuery/getFlights : A callsign must be provided');
      return;
    }

    const apiUrl = api.rootPath + api.arcid.searchCallsign;
    const reqParams = {
      callsign
    };

    dispatch(start(callsign));

    return axios.get(apiUrl, {params: reqParams})
      .then((response) => {
        console.log(response);

        const results = response.data;

        if(_.isEmpty(results)) {
          return dispatch(errorNotFound(callsign));
        }


        if(results.length === 1) {
          return dispatch(completeSingle(results[0]))
        }

        return dispatch(completeMultiple(results));

      })
      .catch((err) => {
        return dispatch(error(err));
      });
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
    dispatch(getProfile(flight.ifplId));
  }
}