import { DefaultEventsMap } from '@socket.io/component-emitter';
import { Socket } from 'socket.io-client';

export interface ISocketIO extends Socket<DefaultEventsMap, DefaultEventsMap> {}

export interface ICreateSocketIO {
  socketIO: ISocketIO | null;
  setSocketIO: (newState: ISocketIO) => void;
}

export interface IUserInfo {
  nickname: string;
  profileImage?: string;
}

export interface ICreateUserInfo {
  userInfo: IUserInfo | null;
  setUserInfo: (newState: IUserInfo) => void;
}

export interface IMessages {
  type: string;
  message: string;
  userId: string | undefined;
  date: string;
  nickname: string;
  profileImage?: string;
}

export interface ICreateMessages {
  messages: IMessages[];
  setMessages: (newState: IMessages) => void;
}
