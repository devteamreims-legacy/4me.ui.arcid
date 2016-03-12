export const START = 'arcid/autocomplete/START';
export const COMPLETE = 'arcid/autocomplete/COMPLETE';

import _ from 'lodash';

import axios from 'axios';
import api from '../api';

export function startSearch(query) {
  return (dispatch, getState) => {
    if(!query) {
      dispatch(clear());
      return;
    }

    const apiUrl = api.rootPath + api.arcid.autocomplete;
    const reqParams = {
      search: query,
    };

    dispatch(startAction(query));

    return axios.get(apiUrl, {params: reqParams})
      .then(resp => {
        const results = resp.data;
        return dispatch(setAutocomplete(results));
      })
      .catch(err => {
        return dispatch({
          type: COMPLETE,
          flights: [],
          error: 'An error occured fetching arcid autocompletion',
          rawError: err
        });
      });

  }
}

export function clear() {
  return {
    type: COMPLETE,
    flights: [],
  };
}

function setAutocomplete(flights) {
  return {
    type: COMPLETE,
    flights,
  };
}


function startAction(query = '') {
  return {
    type: START,
    query,
  };
}
