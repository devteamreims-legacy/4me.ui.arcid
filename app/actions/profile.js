import { singleResult } from '../stub-data/';
import _ from 'lodash';
import { add as globalError, clear as globalErrorClear } from './errors';

export const PROFILE_QUERY_START = 'PROFILE_QUERY_START';
export const PROFILE_QUERY_COMPLETE = 'PROFILE_QUERY_COMPLETE';
export const PROFILE_QUERY_FAIL = 'PROFILE_QUERY_FAIL';
export const PROFILE_QUERY_MULTIPLE = 'PROFILE_QUERY_MULTIPLE';


// Fetches a single flight
// Uses redux thunk
export function getProfile(flightId) {
  return (dispatch, getState) => {
    // Here we expect our flightId to be present in state.results.flights
    let flight = _.find(getState().results.flights, (f) => f.flightId === flightId);
    
    if(_.isEmpty(flight)) {
      dispatch(errorNotFound(flightId));
      return;
    }

    dispatch(start(flightId));

    setTimeout(() => {
      // Result = results from backend
      let result = {
        flight: _.clone(singleResult),
        pointProfile: _.clone(singleResult.pointProfile),
        airspaceProfile: [],
        lastUpdated: Date.now() - 1000*15
      };

      // Create a stub flight object from backend
      let resultFlight = _.clone(singleResult);
      delete resultFlight.pointProfile;


      result.flight = _.merge(resultFlight, flight);

      if(_.isEmpty(result)) {
        dispatch(errorNotFound(flightId, flight.callsign));
      } else {
        dispatch(complete(result));
      }
      return;
    }, 2000);
  }
}

export function errorNotFound(flightId, callsign = '') {
  return (dispatch, getState) => {
    dispatch(globalError(`[id:${flightId}/${callsign}]: Flight not found`));
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

export function start(flightId) {
  return (dispatch, getState) => {
    dispatch(globalErrorClear());
    dispatch({
      type: PROFILE_QUERY_START,
      flightId
    });
  };
}

export function complete(profile = {}) {
  let {flight, pointProfile, airspaceProfile, lastUpdated} = profile;
  return (dispatch, getState) => {
    dispatch(globalErrorClear());
    dispatch({
      type: PROFILE_QUERY_COMPLETE,
      flight,
      pointProfile,
      airspaceProfile,
      lastUpdated
    });
  };
}