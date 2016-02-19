import Actions from '../actions/';


/*
 * state.errors = string
 *
 */

export default function results(state = '', action) {
  switch(action.type) {
    case Actions.Errors.ARCID_ERROR_ADD:
      return action.error;
    case Actions.Errors.ARCID_ERROR_CLEAR:
      return '';
  }
  return state;
}
