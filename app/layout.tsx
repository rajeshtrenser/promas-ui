import './globals.css';
import ToasterClient from '../components/ToasterClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ProMaS',
  description: 'Project Management Sofware',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        <ToasterClient />
        {children}
      </body>
    </html>
  );
}
