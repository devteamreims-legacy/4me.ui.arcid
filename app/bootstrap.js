import _ from 'lodash';

import {
  refreshHistory
} from './actions/history';


import {setupSocketIo} from './socket/';
import api from './api';

import io from 'socket.io-client';

export function bootstrap(store) {
  console.log('Bootstrapping ARCID organ ...');
  console.log('Connecting socket to ' + api.socket);
  const socketIo = io.connect(api.socket);

  console.log('Attaching handlers to socket');
  setupSocketIo(store, socketIo);

  console.log('Refreshing arcid history');
  store.dispatch(refreshHistory());
}
