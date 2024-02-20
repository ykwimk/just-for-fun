import { Button } from '@/app/ui/button';
import { Input } from '@/components/ui/input';

export default function ChatInput() {
  return (
    <div className="flex w-full min-w-sm items-center space-x-2">
      <Input type="text" />
      <Button type="submit">Subscribe</Button>
    </div>
  );
}
