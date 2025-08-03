import { NavLink } from 'react-router-dom';
import { ABOUT_URL } from '../constants';

function AboutLink() {
  function getClassname({ isActive }: { isActive: boolean }): string {
    return isActive ? 'about-link active' : 'about-link';
 }
  return (
    <NavLink to={ABOUT_URL} className={getClassname}>
      About Cat-alog
    </NavLink>
  );
}

export default AboutLink;
