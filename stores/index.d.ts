import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io-client';

export interface ISocketIO extends Socket<DefaultEventsMap, DefaultEventsMap> {}

export interface ICreateSocketIO {
  socketIO: ISocketIO | null;
  setSocketIO: (newState: ISocketIO) => void;
}

export interface IUserInfo {
  nickname: string;
}

export interface ICreateUserInfo {
  userInfo: IUserInfo | null;
  setUserInfo: (newState: IUserInfo) => void;
}
