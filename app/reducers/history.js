

const defaultState = {
  lastUpdated: null,
  isLoading: false,
  error: null,
  flights: [],
};


import {
  FETCH_START,
  FETCH_COMPLETE,
} from '../actions/history';

export default function historyReducer(state = defaultState, action) {
  switch(action.type) {
    case FETCH_START:
      return Object.assign({}, state, {isLoading: true, error: null});
    case FETCH_COMPLETE:
      return Object.assign({}, state, {
        isLoading: false,
        error: action.error || null,
        flights: action.flights || [],
        lastUpdated: Date.now(),
      });
  }
  return state;
}
