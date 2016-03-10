import {
  socketConnected,
  socketDisconnected
} from '../actions/socket';

let mySocket;

// Global socketIo object event handler
export function setupSocketIo(store, socketIo) {
  console.log('Initializing socket.io');

  mySocket = socketIo;

  socketIo.on('connect', function(socket) {
    console.log('Connected to server !');
    store.dispatch(socketConnected());
  });

  socketIo.on('disconnect', (socket) => store.dispatch(socketDisconnected()));

  attachHandlerToSocket(store, socketIo);

  return mySocket;
}


export function getSocket() {
  return mySocket;
}

import {
  setHistory,
} from '../actions/history';

export function attachHandlerToSocket(store, socket) {

  socket.on('update_history', (data) => {
    //console.log('UPDATE_FLIGHTS');
    //console.log(data);

    store.dispatch(setHistory(data));
  });


}
