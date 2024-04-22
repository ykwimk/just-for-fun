import { Badge } from '@/app/ui/badge';
import { useSocketIO } from '@/stores';
import { UsersRound } from 'lucide-react';

export default function ChatNumberPeople() {
  const { socketIO } = useSocketIO();

  return (
    <div className="w-full flex justify-end mb-2">
      <Badge variant="outline" className="flex items-center text-sm">
        <UsersRound className="inline-block w-5 h-5 mr-1" />
        <span className="leading-[100%]">0</span>
      </Badge>
    </div>
  );
}
