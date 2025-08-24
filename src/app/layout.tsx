import '@/styles/globals.css';

import { Analytics } from '@vercel/analytics/next';

import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Verify Scholar',
  description: 'Verify DOST SA USC Scholars',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-secondary bg-background antialiased">
        <div className="flex min-h-svh flex-col items-center justify-center bg-[url('/pattern.png')] bg-[length:160px_160px] bg-repeat md:bg-[length:180px_180px] lg:bg-[length:200px_200px]">
          {children}
        </div>
      </body>
      <Analytics />
    </html>
  );
}
