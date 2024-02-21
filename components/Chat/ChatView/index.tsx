import { Card } from '@/app/ui/card';
import ChatBubble from './ChatBubble';
import { useSocketIO } from '@/stores';
import { useEffect, useState } from 'react';

export default function ChatView() {
  const { socketIO } = useSocketIO();

  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (socketIO) {
      socketIO.on('message', (messages: { message: string }) => {
        setMessages((prev) => [...prev, messages.message]);
      });
    }
  }, [socketIO]);

  return (
    <Card className="w-full h-full flex flex-col-reverse mb-5 p-3 bg-gray-600">
      {messages.map((message: string, index: number) => {
        return <ChatBubble key={index} text={message} />;
      })}
    </Card>
  );
}
