import { Avatar, AvatarFallback, AvatarImage } from '@/app/ui/avatar';

interface IProps {
  target?: 'ME' | 'YOU';
  imgUrl?: string;
  name?: string;
  date?: string;
  text?: string;
  status?: string;
}

export default function ChatBubble({
  target = 'YOU',
  imgUrl = 'https://github.com/shadcn.png',
  name = 'Bonnie Green',
  date = '11:46',
  text = "That's awesome. I think our users will really appreciate the improvements.",
  status = 'Delivered',
}: IProps) {
  return (
    <div
      className={`flex items-start gap-2.5 ${target === 'ME' && 'justify-end'}`}
    >
      {target === 'YOU' && (
        <Avatar>
          <AvatarImage src={imgUrl} alt={name} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 ${
          target === 'YOU'
            ? 'rounded-e-xl rounded-es-xl'
            : 'rounded-l-xl rounded-br-xl'
        } dark:bg-gray-700`}
      >
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {name}
          </span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
            {date}
          </span>
        </div>
        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
          {text}
        </p>
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          {status}
        </span>
      </div>
    </div>
  );
}
