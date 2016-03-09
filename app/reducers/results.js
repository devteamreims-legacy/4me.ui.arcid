import Actions from '../actions/';
import _ from 'lodash';


/*
 * state = {
 *   isLoading: boolean,
 *   query: string,
 *   flights: array
 * }; 
 */

const defaultState = {
  flights: [],
  query: '',
  isLoading: false
};

export default function results(state = defaultState, action) {
  switch(action.type) {
    case Actions.ArcidQuery.ARCID_QUERY_START:
      return Object.assign({}, state, {
        isLoading: true,
        query: action.callsign
      });
    case Actions.ArcidQuery.ARCID_QUERY_FAIL:
      return Object.assign({}, state, {
        isLoading: false
      });
    case Actions.ArcidQuery.ARCID_QUERY_COMPLETE:
      let addedFlightIds = _.map(action.flights, (f) => f.ifplId);
      console.log('Added flight IDs');
      console.log(addedFlightIds);
      let stateFlights = _.filter(state.flights, (f) => !_.includes(addedFlightIds, f.ifplId));
      console.log(stateFlights);
      return Object.assign({}, state, {
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
