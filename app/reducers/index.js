import * as ActionTypes from '../actions/';
import { combineReducers } from 'redux';
import resultsReducer from './results';
import profileReducer from './profile';
import errorsReducer from './errors';


function flightProfile(state = {}, action) {
  return state;
}

const rootReducer = combineReducers({
  flightProfile: profileReducer,
  results: resultsReducer,
  errors: errorsReducer
});

export default rootReducer;