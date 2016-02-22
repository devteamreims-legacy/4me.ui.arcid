import Actions from '../actions/';
import merge from 'lodash/merge';


/*
 * state = {
 *   isLoading: boolean,
 *   flightId: integer,
 *   when: Date,
 *   flight: {},
 *   pointProfile: [],
 *   airspaceProfile: []
 * };
 */

export default function results(state = {flightId: null, pointProfile: [], airspaceProfile: [], isLoading: false, flight: {}}, action) {
  switch(action.type) {
    case Actions.Profile.PROFILE_QUERY_START:
      return merge({}, state, {
        isLoading: true,
        flightId: action.flightId,
        flight: {},
        pointProfile: {},
        airspaceProfile: {}
      });
    case Actions.Profile.PROFILE_QUERY_FAIL:
      return merge({}, state, {
        isLoading: false,
        flightId: null,
        flight: {},
        pointProfile: {},
        airspaceProfile: {}
      });
    case Actions.Profile.PROFILE_QUERY_COMPLETE:
      return merge({}, state, {
        isLoading: false,
        // TODO : limit to XX results
        lastUpdated: action.lastUpdated,
        flight: action.flight,
        pointProfile: action.pointProfile,
        airspaceProfile: action.airspaceProfile
      });
  }
  return state;
}
