import { NavLink } from 'react-router-dom';
import { ABOUT_URL } from '../../constants';
import { getClassname } from './helpers';

function AboutLink() {
  return (
    <NavLink to={ABOUT_URL} className={getClassname}>
      About Cat-alog
    </NavLink>
  );
}

export default AboutLink;
