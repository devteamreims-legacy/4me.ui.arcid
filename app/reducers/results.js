import Actions from '../actions/';
import merge from 'lodash/merge';
import _ from 'lodash';


/*
 * state = {
 *   isLoading: boolean,
 *   query: string,
 *   flights: array
 * }; 
 */

export default function results(state = {flights: [], query: '', isLoading: false}, action) {
  switch(action.type) {
    case Actions.ArcidQuery.ARCID_QUERY_START:
      return merge({}, state, {isLoading: true, query: action.callsign});
    case Actions.ArcidQuery.ARCID_QUERY_FAIL:
      return merge({}, state, {isLoading: false});
    case Actions.ArcidQuery.ARCID_QUERY_COMPLETE:
      let addedFlightIds = _.map(action.flights, (f) => f.flightId);
      console.log('Added flight IDs');
      console.log(addedFlightIds);
      let stateFlights = _.filter(state.flights, (f) => !_.includes(addedFlightIds, f.flightId));
      console.log(stateFlights);
      return merge({}, state, {
        isLoading: false,
        query: '',
        flights: _.take([
          ...action.flights,
          ...stateFlights
        ], 10)
      });
  }
  return state;
}
