import { NavLink } from 'react-router-dom';
import styles from './AboutLink.module.css';
import { ABOUT_URL } from '../../constants';

function AboutLink() {
  function getClassname({ isActive }: { isActive: boolean }): string {
    return isActive
      ? `${styles.aboutLink} ${styles.active}`
      : `${styles.aboutLink}`;
 }
  return (
    <NavLink to={ABOUT_URL} className={getClassname}>
      About Cat-alog
    </NavLink>
  );
}

export default AboutLink;
