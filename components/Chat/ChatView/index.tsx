import { Card } from '@/app/ui/card';
import ChatBubble from './ChatBubble';
import { useSocketIO } from '@/stores';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';

interface IMessages {
  message: string;
  userId: string;
  date: string;
  nickname: string;
}

export default function ChatView() {
  const { socketIO } = useSocketIO();

  const sentinel = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<IMessages[]>([]);

  const emitSendIsRead = (isRead: boolean) => {
    if (socketIO) {
      socketIO.emit('sendIsRead', {
        userId: socketIO.id,
        isRead,
      });
    }
  };

  useEffect(() => {
    if (socketIO) {
      socketIO.on(
        'message',
        ({
          userId,
          message,
          date,
          nickname,
        }: {
          userId: string;
          message: string;
          date: Date;
          nickname: string;
        }) => {
          setMessages((prev) => [
            ...prev,
            { userId, message, date: dayjs(date).format('hh:mm A'), nickname },
          ]);
        },
      );

      window.addEventListener('focus', () => {
        emitSendIsRead(true);
      });

      return () => {
        window.removeEventListener('focus', () => {
          emitSendIsRead(false);
        });
      };
    }
  }, [socketIO]);

  useEffect(() => {
    if (messages) {
      sentinel.current?.scrollIntoView(false);
    }
  }, [messages]);

  return (
    <Card className="w-full h-full flex flex-col flex-nowrap [&>div:first-child]:mt-auto gap-2.5 mb-5 p-3 bg-gray-600 overflow-auto">
      {messages.map((item: IMessages, index: number) => {
        return (
          <ChatBubble
            key={index}
            text={item.message}
            date={item.date}
            nickname={item.nickname}
            target={item.userId === socketIO?.id ? 'ME' : 'YOU'}
          />
        );
      })}
      <div ref={sentinel} />
    </Card>
  );
}
