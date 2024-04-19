import { Button } from '@/app/ui/button';
import { Input } from '@/components/ui/input';
import { useSocketIO, useUserInfo } from '@/stores';
import { Paperclip } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';

export default function ChatInput() {
  const { socketIO } = useSocketIO();
  const { userInfo } = useUserInfo();

  const fileRef = useRef<any>(null);

  const [value, setValue] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const emitSendBroadcasting = (isTypingMessage: boolean) => {
    if (socketIO) {
      socketIO.emit('sendBroadcasting', {
        userId: socketIO.id,
        isTypingMessage,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (socketIO) {
      emitSendBroadcasting(!!value.length);
    }

    setValue(value);
  };

  const handleClick = () => {
    if (fileRef.current) {
      fileRef.current.value = null;
      fileRef.current.click();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (socketIO && value) {
      socketIO.emit('sendMessage', {
        type: 'TALK',
        userId: socketIO.id,
        message: value,
        date: new Date(),
        nickname: userInfo?.nickname,
        profileImage: userInfo?.profileImage,
      });

      emitSendBroadcasting(false);

      setValue('');
    }
  };

  useEffect(() => {
    if (socketIO) {
      socketIO.on('broadcasting', ({ userId, isTypingMessage }) => {
        setIsTyping(isTypingMessage && socketIO.id !== userId);
      });
    }
  }, [socketIO]);

  return (
    <div className="w-full pb-5 relative">
      <form
        className="flex w-full items-center space-x-2"
        onSubmit={handleSubmit}
      >
        <Input type="text" value={value} onChange={handleChange} />
        <Button type="button" variant="outline" onClick={handleClick}>
          <Paperclip className="w-4 h-4" />
          <Input type="file" ref={fileRef} hidden />
        </Button>
        <Button type="submit">Send</Button>
      </form>
      {isTyping && (
        <div className="absolute -bottom-1 left-1 text-xs">Typing...</div>
      )}
    </div>
  );
}
