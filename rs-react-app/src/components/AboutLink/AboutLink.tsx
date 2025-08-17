import { useTranslations } from 'next-intl';
import { ABOUT_URL } from '../../constants';
import { Link } from '../../i18n/navigation';
import { getClassname } from './helpers';

function AboutLink() {
  const t = useTranslations('AboutLink');

  return (
    <Link href={ABOUT_URL} className={getClassname()}>
      {t('title')}
    </Link>
  );
}

export default AboutLink;
