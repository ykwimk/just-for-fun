import { Badge } from '@/src/app/ui/badge';
import { useSocketIO } from '@/src/stores';
import { UsersRound } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ChatNumberPeople() {
  const { socketIO } = useSocketIO();
  const [chatMembers, setChatMembers] = useState<any[]>([]);

  useEffect(() => {
    if (socketIO) {
      socketIO.on('chatMembers', ({ chatMembers }) => {
        setChatMembers(chatMembers);
      });
    }
  }, [socketIO]);

  return (
    <div className="w-full flex justify-end mb-2">
      <Badge variant="outline" className="flex items-center text-sm">
        <UsersRound className="inline-block w-5 h-5 mr-1" />
        <span className="leading-[100%]">{chatMembers.length}</span>
      </Badge>
    </div>
  );
}
