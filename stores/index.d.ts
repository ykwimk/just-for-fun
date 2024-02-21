export interface IChatInfo {
  id: string | undefined;
  connected: boolean;
}
export interface ICreateChatInfo {
  chatInfo: IChatInfo | null;
  setChatInfo: (newState: IChatInfo) => void;
}
