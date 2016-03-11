const defaultState = {
  lastUpdated: null,
  isLoading: false,
  error: null,
  query: null,
  flights: [],
};


import {
  START,
  COMPLETE,
} from '../actions/autocomplete';

import {
  START as PROFILE_START
} from '../actions/profile';

export default function autocompleteReducer(state = defaultState, action) {
  switch(action.type) {
    case START:
      return Object.assign({}, state, {
        isLoading: true,
        error: null,
        query: action.query,
      });
    case COMPLETE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error || null,
        flights: action.flights || [],
        lastUpdated: Date.now(),
      });
    // When the user clicks on a profile, remove autocomplete results
    case PROFILE_START:
      return Object.assign({}, state, defaultState);
  }
  return state;
}
