import Link from 'next/link';
import { ABOUT_URL } from '../../constants';
import { getClassname } from './helpers';

function AboutLink() {
  return (
    <Link href={ABOUT_URL} className={getClassname()}>
      About Cat-alog
    </Link>
  );
}

export default AboutLink;
