import ChatView from './ChatView';
import ChatInput from './ChatInput';
import { useEffect } from 'react';
import { useToast } from '@/app/ui/use-toast';
import { useSocketIO } from '@/stores';
import { io } from 'socket.io-client';

export default function Chat() {
  const { toast } = useToast();
  const { setSocketIO } = useSocketIO();

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL as string;

    const socketIO = io(url, {
      reconnection: true,
    });

    if (socketIO) {
      setSocketIO(socketIO);

      socketIO.on('connect', () => {
        toast({
          title: '채팅방에 접속되었습니다.',
        });
      });

      socketIO.on('error', (error: Error) => {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
        });

        console.error(error);
      });

      return () => {
        socketIO.disconnect();
      };
    }
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
