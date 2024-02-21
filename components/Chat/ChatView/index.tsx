import { Card } from '@/app/ui/card';
import ChatBubble from './ChatBubble';

export default function ChatView() {
  return (
    <Card className="w-full h-full flex flex-col-reverse mb-5 p-3 bg-gray-600">
      <ChatBubble />
    </Card>
  );
}
