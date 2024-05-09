import type { Metadata, Viewport } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import './globals.css';

const notoSansKr = Noto_Sans_KR({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Just for fun!',
  description: 'funny;',
  keywords: 'just, for, fun',
  openGraph: {
    type: 'website',
    url: 'https://localhost:3000',
    title: 'Just for fun',
    description: 'funny;',
    siteName: 'Just for fun',
    images: [
      {
        url: 'https://example.com/og.png',
      },
    ],
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  width: 'device-width',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notoSansKr.className}>{children}</body>
    </html>
  );
}
