import { Card } from '@/app/ui/card';
import ChatBubble from './ChatBubble';
import { useSocketIO } from '@/stores';
import { useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';

export default function ChatView() {
  const { socketIO } = useSocketIO();

  const sentinel = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<
    { message: string; userId: string; date: string }[]
  >([]);

  useEffect(() => {
    if (socketIO) {
      socketIO.on(
        'message',
        ({
          userId,
          message,
          date,
        }: {
          userId: string;
          message: string;
          date: Date;
        }) => {
          setMessages((prev) => [
            ...prev,
            { userId, message, date: dayjs(date).format('hh:mm A') },
          ]);
        },
      );
    }
  }, [socketIO]);

  useEffect(() => {
    if (messages) {
      sentinel.current?.scrollIntoView(false);
    }
  }, [messages]);

  return (
    <Card className="w-full h-full flex flex-col flex-nowrap [&>div:first-child]:mt-auto gap-2.5 mb-5 p-3 bg-gray-600 overflow-auto">
      {messages.map(
        (
          item: { message: string; userId: string; date: string },
          index: number,
        ) => {
          return (
            <ChatBubble
              key={index}
              text={item.message}
              date={item.date}
              target={item.userId === socketIO?.id ? 'ME' : 'YOU'}
            />
          );
        },
      )}
      <div ref={sentinel} />
    </Card>
  );
}
