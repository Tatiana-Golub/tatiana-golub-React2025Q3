import { useTranslations } from 'next-intl';
import BackButton from '../../../components/BackButton';
import styles from './about.module.css';
import { createNavigation } from 'next-intl/navigation';

export default function About() {
  const t = useTranslations('About');
  const { Link } = createNavigation();

  return (
    <div className={styles.about}>
      <h1 className={styles.aboutTitle}>{t('title')}</h1>
      <p className={styles.aboutDescription}>
        {t.rich('developer', {
          strong: (chunks) => <strong>{chunks}</strong>,
        })}
      </p>

      <p className={styles.aboutDescription}>
        {t.rich('course', {
          link: (children: React.ReactNode) => (
            <Link
              href="https://rs.school/courses/reactjs"
              target="_blank"
              className={styles.schoolLink}
            >
              {children}
            </Link>
          ),
        })}
      </p>
      <BackButton />
    </div>
  );
}
