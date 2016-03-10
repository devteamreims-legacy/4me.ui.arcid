
const defaultState = {
  isLoading: false,
  callsign: '',
  error: null,
  results: [],
};

import {
  QUERY_START,
  QUERY_COMPLETE,
  QUERY_CLEAR_RESULTS,
} from '../actions/query';


export default function queryReducer(state = defaultState, action) {
  switch(action.type) {
    case QUERY_START:
      return Object.assign({}, state, {isLoading: true, callsign: action.callsign});
    case QUERY_COMPLETE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error || null,
        results: action.results || [],
      });
    case QUERY_CLEAR_RESULTS:
      return Object.assign({}, state, defaultState);
  }
  return state;
}
