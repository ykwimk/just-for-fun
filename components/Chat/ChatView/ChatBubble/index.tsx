import { Avatar, AvatarFallback, AvatarImage } from '@/app/ui/avatar';
import { Button } from '@/app/ui/button';
import { useSocketIO } from '@/stores';
import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';

interface IProps {
  target: 'ME' | 'YOU';
  imgUrl?: string;
  nickname: string;
  date: string;
  text: string;
  attachmentFile?: {
    name: string;
    file: string;
  };
}

export default function ChatBubble({
  target = 'YOU',
  imgUrl = 'https://github.com/shadcn.png',
  nickname = 'Bonnie Green',
  date = '11:46',
  text = "That's awesome. I think our users will really appreciate the improvements.",
  attachmentFile,
}: IProps) {
  const { socketIO } = useSocketIO();

  const [isRead, setIsRead] = useState<boolean>(false);

  useEffect(() => {
    if (socketIO) {
      socketIO.on('isRead', ({ userId, isRead }) => {
        if (socketIO.id !== userId) {
          setIsRead(isRead);
        }
      });
    }
  }, [socketIO]);

  return (
    <div>
      <div
        className={`relative flex items-start gap-2.5 ${
          target === 'ME' && 'justify-end'
        }`}
      >
        {target === 'YOU' && (
          <Avatar>
            <AvatarImage src={imgUrl} alt={nickname} />
            <AvatarFallback>{nickname}</AvatarFallback>
          </Avatar>
        )}
        <div
          className={`relative flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 ${
            target === 'YOU'
              ? 'rounded-e-xl rounded-es-xl'
              : 'rounded-l-xl rounded-br-xl'
          } dark:bg-gray-700`}
        >
          {target === 'ME' && !isRead && (
            <span className="bottom-1.5 -left-3 absolute w-1.5 h-1.5 bg-yellow-400 rounded-full" />
          )}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {nickname}
            </span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {date}
            </span>
          </div>
          <p className="text-sm font-normal pt-2.5 text-gray-900 dark:text-white">
            {text}
          </p>
        </div>
      </div>
      {attachmentFile && (
        <div
          className={`relative flex items-start gap-2.5 mt-1 ${
            target === 'ME' && 'justify-end'
          }`}
        >
          <div
            className={`relative flex flex-col w-auto max-w-[320px] leading-1.5 p-3 border-gray-200 bg-gray-100 ${
              target === 'YOU'
                ? 'rounded-e-xl rounded-es-xl'
                : 'rounded-l-xl rounded-br-xl'
            } dark:bg-gray-700`}
          >
            {target === 'ME' && !isRead && (
              <span className="bottom-1.5 -left-3 absolute w-1.5 h-1.5 bg-yellow-400 rounded-full" />
            )}
            <div className="flex items-center gap-2 text-sm font-normal text-gray-900 dark:text-white">
              {attachmentFile.name}{' '}
              <Button variant="outline" className="px-3 rounded-full" asChild>
                <a href={attachmentFile.file} download>
                  <Download className="inline w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
