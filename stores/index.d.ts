import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io-client';

export interface ISocketIO extends Socket<DefaultEventsMap, DefaultEventsMap> {}

export interface ICreateSocketIO {
  socketIO: ISocketIO | null;
  setSocketIO: (newState: ISocketIO) => void;
}
