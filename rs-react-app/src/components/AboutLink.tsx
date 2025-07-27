import { NavLink } from 'react-router-dom';
import { ABOUT_URL } from '../constants';

function AboutLink() {
  return (
    <NavLink
      to={ABOUT_URL}
      className={({ isActive }: { isActive: boolean }) =>
        isActive ? 'about-link active' : 'about-link'
      }
    >
      About Cat-alog
    </NavLink>
  );
}

export default AboutLink;
