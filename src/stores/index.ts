import { ICreateSocketIO, ICreateUserInfo, ICreateMessages } from './index.d';
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

export const useMessages = create<ICreateMessages>((set) => ({
  messages: [],
  setMessages(newState) {
    set((state) => {
      return { messages: [...state.messages, newState] };
    });
  },
}));
