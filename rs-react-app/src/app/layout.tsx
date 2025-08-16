import { Metadata } from 'next';
import { ThemeProvider } from '../context/ThemeContex';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cat-alog',
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale?: string };
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const lang = params?.locale || 'en';
  return (
    <html lang={lang}>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
