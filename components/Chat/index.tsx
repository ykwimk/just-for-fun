import ChatView from './ChatView';
import ChatInput from './ChatInput';
import { io } from 'socket.io-client';
import { useEffect } from 'react';
import { useToast } from '@/app/ui/use-toast';
import { useChatInfo } from '@/stores';

export default function Chat() {
  const { toast } = useToast();
  const { setChatInfo } = useChatInfo();

  useEffect(() => {
    const socketIO = io('http://localhost:5000', {
      reconnection: true,
    });

    if (socketIO) {
      socketIO.on('connect', () => {
        toast({
          title: '채팅방에 접속되었습니다.',
        });

        setChatInfo({
          id: socketIO.id,
          connected: socketIO.connected,
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
