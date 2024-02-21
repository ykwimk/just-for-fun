import ChatView from './ChatView';
import ChatInput from './ChatInput';
import { io } from 'socket.io-client';
import { useEffect } from 'react';

export default function Chat() {
  useEffect(() => {
    // const io = new Server({
    //   cors: {
    //     origin: 'http://localhost:3000',
    //   },
    // });

    // io.listen(3000);
    const socket = io('http://localhost:3000');

    socket.connect();

    // socket.on('connect', async () => {
    //   console.log('connect!!!');
    // });

    console.log('socket: ', socket);
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
