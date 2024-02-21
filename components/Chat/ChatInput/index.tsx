import { Button } from '@/app/ui/button';
import { Input } from '@/components/ui/input';
import { useSocketIO } from '@/stores';
import { FormEvent, useState } from 'react';

export default function ChatInput() {
  const { socketIO } = useSocketIO();

  const [value, setValue] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (socketIO && value) {
      socketIO.emit('sendMessage', {
        userId: socketIO.id,
        message: value,
        date: new Date(),
      });

      setValue('');
    }
  };

  return (
    <div className="w-full">
      <form
        className="flex w-full items-center space-x-2"
        onSubmit={handleSubmit}
      >
        <Input type="text" value={value} onChange={handleChange} />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
