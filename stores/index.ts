import { ICreateSocketIO, ICreateUserInfo } from './index.d';
import { create } from 'zustand';

export const useSocketIO = create<ICreateSocketIO>((set) => ({
  socketIO: null,
  setSocketIO(newState) {
    set(() => {
      return { socketIO: newState };
    });
  },
}));

export const useUserInfo = create<ICreateUserInfo>((set) => ({
  userInfo: null,
  setUserInfo(newState) {
    set(() => {
      return { userInfo: newState };
    });
  },
}));
