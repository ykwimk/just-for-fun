'use client';

import Chat from '@/src/components/Chat';
import Header from '@/src/components/Header';
import EntryModal from '@/src/components/EntryModal';
import { useUserInfo } from '@/src/stores';

export default function Page() {
  const { userInfo } = useUserInfo();

  return (
    <>
      <Header />
      <Chat />
      {!userInfo && <EntryModal />}
    </>
  );
}
