import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeChanger from './components/ThemeChanger';
import Navbar from './components/Navbar/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nexify',
  description: 'Nexify commerce - prisma test project',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar/>
        <main className="p-4 max-w-7xl m-auto min-w-[300px]">
          <ThemeChanger />
          {children}
        </main>
      </body>
    </html>
  );
}
