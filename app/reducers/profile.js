import Actions from '../actions/';
import merge from 'lodash/merge';


/*
 * state = {
 *   isLoading: boolean,
 *   ifplId: integer,
 *   when: Date,
 *   flight: {},
 *   pointProfile: [],
 *   airspaceProfile: []
 * };
 */

const defaultState = {
  isLoading: false,
  ifplId: null,
  data: {}
};


export default function results(state = defaultState, action) {
  switch(action.type) {
    case Actions.Profile.PROFILE_QUERY_START:
      return Object.assign({}, state, {
        isLoading: true,
        ifplId: action.ifplId,
        data: {}
      });
    case Actions.Profile.PROFILE_QUERY_FAIL:
      return Object.assign({}, state, {
        isLoading: false,
        ifplId: null,
        data: {}
      });
    case Actions.Profile.PROFILE_QUERY_COMPLETE:
      return Object.assign({}, state, {
        isLoading: false,
        ifplId: action.ifplId,
        data: _.omit(action, 'type')
      });
  }
  return state;
}
