export const QUERY_START = 'arcid/QUERY_START';
export const QUERY_COMPLETE = 'arcid/QUERY_COMPLETE';
export const QUERY_CLEAR_RESULTS = 'arcid/QUERY_CLEAR_RESULTS';

import _ from 'lodash';

import axios from 'axios';
import api from '../api';

import {
  isLoading,
  hasMultipleResults,
  hasNoResults,
  getResults,
} from '../selectors/query';

import {
  getProfile,
} from './profile';

export function startQuery(callsign) {
  return (dispatch, getState) => {
    if(_.isEmpty(callsign)) {
      return;
    }

    if(isLoading(getState())) {
      console.log('arcid/query/startQuery : A query is already in progress ...');
      return;
    }

    // Inform our store that we are starting a callsign query
    dispatch({
      type: QUERY_START,
      callsign,
    });

    const apiUrl = api.rootPath + api.arcid.searchCallsign;
    const reqParams = {
      callsign
    };

    return axios.get(apiUrl, {params: reqParams})
      .then(resp => {
        const results = resp.data;

        if(_.isEmpty(results)) {
          return dispatch({
            type: QUERY_COMPLETE,
            error: `${callsign} returned no results, check with flow management`,
          });
        }

        return dispatch({
          type: QUERY_COMPLETE,
          results,
        });
      })
      .then(() => {
        // Check state, if only 1 result, dispatch getProfile
        if(hasMultipleResults(getState()) || hasNoResults(getState())) {
          return;
        }

        const result = _.head(getResults(getState()));
        const ifplId = _.get(result, 'ifplId', null);
        if(!ifplId) {
          return;
        }

        return dispatch(getProfile(ifplId));
      })
      .catch(err => dispatch({
        type: QUERY_COMPLETE,
        error: 'An error occured contacting arcid backend',
        rawError: err,
      }));
  };
}

export function clearResults() {
  return {
    type: QUERY_CLEAR_RESULTS,
  };
}
