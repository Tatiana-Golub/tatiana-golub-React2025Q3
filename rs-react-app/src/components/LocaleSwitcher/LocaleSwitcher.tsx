'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './LocaleSwitcher.module.css';

export default function LocaleSwitcher() {
  const pathname = usePathname() || '/en';

  const switchLocale = (locale: 'en' | 'ru') => {
    const segments = pathname.split('/');
    segments[1] = locale;
    return segments.join('/');
  };

  const currentLocale = pathname.split('/')[1];

  return (
    <div className={styles.switcherContainer}>
      <Link
        href={switchLocale('en')}
        className={`${styles.switcher} ${currentLocale === 'en' ? styles.active : ''}`}
      >
        EN
      </Link>
      <Link
        href={switchLocale('ru')}
        className={`${styles.switcher} ${currentLocale === 'ru' ? styles.active : ''}`}
      >
        RU
      </Link>
    </div>
  );
}
