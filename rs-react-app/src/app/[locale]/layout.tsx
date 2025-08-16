import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '../../i18n/routing';
import { ThemeProvider } from '../../context/ThemeContex';
import { ReduxProvider } from '../../store/ReduxProvider';
import LocaleSwitcher from '../../components/LocaleSwitcher/LocaleSwitcher';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <ReduxProvider>
          <ThemeProvider>
            <NextIntlClientProvider locale={locale}>
              <LocaleSwitcher />
              {children}
            </NextIntlClientProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
