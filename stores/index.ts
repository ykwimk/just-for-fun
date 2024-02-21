import { IChatInfo, ICreateChatInfo } from './index.d';
import { create } from 'zustand';

export const useChatInfo = create<ICreateChatInfo>((set) => ({
  chatInfo: null,
  setChatInfo: (newState: IChatInfo) => {
    set(() => {
      return { chatInfo: newState };
    });
  },
}));
