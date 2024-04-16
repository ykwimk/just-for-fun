import { Card } from '@/app/ui/card';
import ChatBubble from './ChatBubble';
import { useMessages, useSocketIO } from '@/stores';
import { useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { IMessages } from '@/stores/index.d';
import ChatAlarm from './ChatAlarm';

export default function ChatView() {
  const { socketIO } = useSocketIO();
  const { messages, setMessages } = useMessages();

  const sentinel = useRef<HTMLDivElement>(null);

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
          type,
          userId,
          message,
          date,
          nickname,
          profileImage,
        }: IMessages) => {
          setMessages({
            type,
            userId,
            message,
            date: dayjs(date).format('hh:mm A'),
            nickname,
            profileImage,
          });
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
        if (item.type === 'NOTICE') {
          return <ChatAlarm key={index} nickname={item.nickname} />;
        }

        return (
          <ChatBubble
            key={index}
            text={item.message}
            date={item.date}
            nickname={item.nickname}
            target={item.userId === socketIO?.id ? 'ME' : 'YOU'}
            imgUrl={item.profileImage}
          />
        );
      })}
      <div ref={sentinel} />
    </Card>
  );
}
