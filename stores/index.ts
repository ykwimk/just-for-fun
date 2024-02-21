import { ICreateSocketIO, ISocketIO } from './index.d';
import { create } from 'zustand';

export const useSocketIO = create<ICreateSocketIO>((set) => ({
  socketIO: null,
  setSocketIO(newState) {
    set(() => {
      return { socketIO: newState };
    });
  },
}));
