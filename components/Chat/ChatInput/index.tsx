import { Badge } from '@/app/ui/badge';
import { Button } from '@/app/ui/button';
import { Input } from '@/components/ui/input';
import { useSocketIO, useUserInfo } from '@/stores';
import { Paperclip, X } from 'lucide-react';
import { FormEvent, useEffect, useRef, useState } from 'react';

export default function ChatInput() {
  const { socketIO } = useSocketIO();
  const { userInfo } = useUserInfo();

  const fileRef = useRef<any>(null);

  const [value, setValue] = useState<string>('');
  const [file, setFile] = useState<{ [key: string]: any } | null>(null);
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

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files as FileList;
    const fileReader = new FileReader();

    fileReader.onload = () => {
      const result = fileReader.result as string;

      setFile({
        name: files[0].name,
        result,
      });
    };

    fileReader.readAsDataURL(files[0]);
  };

  const handleRemoveFile = () => {
    setFile(null);
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
        attachmentFile: file
          ? {
              name: file?.name,
              file: file?.result,
            }
          : undefined,
      });

      emitSendBroadcasting(false);

      setValue('');
      setFile(null);
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
          <Input type="file" ref={fileRef} onChange={handleFile} hidden />
        </Button>
        <Button type="submit">Send</Button>
      </form>
      {isTyping && (
        <div className="absolute -bottom-3 left-1 text-xs">Typing...</div>
      )}
      {file && (
        <Badge
          variant="outline"
          className="absolute -bottom-3 right-1 text-xs flex center leading-[100%]"
        >
          {file.name}
          <button
            type="button"
            className="inline-block w-4 h-4 ml-1"
            onClick={handleRemoveFile}
          >
            <X className="w-full h-full" />
          </button>
        </Badge>
      )}
    </div>
  );
}
