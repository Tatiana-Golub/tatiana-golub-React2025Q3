import { Metadata } from 'next';
import { ThemeProvider } from '../context/ThemeContex';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cat-alog',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <div id="root">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
