import Chat from '@/components/Chat';
import Header from '@/components/Header';
import NicknameModal from '@/components/NicknameModal';
import { useUserInfo } from '@/stores';

export default function Layout() {
  const { userInfo } = useUserInfo();

  return (
    <>
      <Header />
      <Chat />
      {!userInfo && <NicknameModal />}
    </>
  );
}
