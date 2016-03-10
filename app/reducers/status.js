const defaultState = {
  status: 'ERROR',
  error: 'Connection to backend failed (websocket)',
};


import {
  CONNECTED as SOCKET_CONNECTED,
  DISCONNECTED as SOCKET_DISCONNECTED,
} from '../actions/socket';

export default function statusReducer(state = defaultState, action) {
  switch(action.type) {
    case SOCKET_CONNECTED:
      return Object.assign({}, state, {
        status: 'OK',
        error: null,
      });
    case SOCKET_DISCONNECTED:
      return Object.assign({}, state, defaultState);
  }
  return state;
}
