import ChatView from './ChatView';
import ChatInput from './ChatInput';
import { io } from 'socket.io-client';
import { useEffect } from 'react';

export default function Chat() {
  useEffect(() => {
    const socket = io('http://localhost:5000');

    socket.on('connect', () => {
      socket.on('useSuccess', () => {
        console.log('success!!');
      });
    });
  }, []);

  return (
    <div className="w-full h-[calc(100%-56px)] p-10">
      <div className="max-w-md h-full m-auto flex flex-col">
        <ChatView />
        <ChatInput />
      </div>
    </div>
  );
}
