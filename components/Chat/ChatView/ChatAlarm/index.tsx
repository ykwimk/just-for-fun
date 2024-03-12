interface IProps {
  nickname: string;
}

export default function ChatAlarm({ nickname = 'asdf' }: IProps) {
  return (
    <div className="mx-auto my-0 opacity-80">
      <div className="text-center bg-gray-100 text-xs inline-block px-2 py-1 rounded-lg">
        {nickname} joined.
      </div>
    </div>
  );
}
