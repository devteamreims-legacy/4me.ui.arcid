import { combineReducers } from 'redux';
import profileReducer from './profile';
import queryReducer from './query';
import historyReducer from './history';
import statusReducer from './status';

const rootReducer = combineReducers({
  profile: profileReducer,
  query: queryReducer,
  history: historyReducer,
  status: statusReducer,
});

export default rootReducer;
