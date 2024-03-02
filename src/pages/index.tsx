import Chat from '@/components/Chat';
import Header from '@/components/Header';
import EntryModal from '@/components/EntryModal';
import { useUserInfo } from '@/stores';

export default function Layout() {
  const { userInfo } = useUserInfo();

  return (
    <>
      <Header />
      <Chat />
      {!userInfo && <EntryModal />}
    </>
  );
}
