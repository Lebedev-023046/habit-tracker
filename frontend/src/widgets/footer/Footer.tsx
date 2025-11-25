import { ROUTES } from '@/shared/config/routes';
import type { IconType } from 'react-icons';
import { HiOutlineViewBoards } from 'react-icons/hi';
import { PiStarFour } from 'react-icons/pi';
import { NavLink } from 'react-router-dom';
import styles from './Footer.module.css';

const navItems = [
  { to: ROUTES.home, label: 'Daily', Icon: PiStarFour },
  { to: ROUTES.habitBoard, label: 'Board', Icon: HiOutlineViewBoards },
];

const renderLink = ({
  to,
  label,
  Icon,
}: {
  to: () => string;
  label: string;
  Icon: IconType;
}) => {
  return (
    <li className={styles.navItem}>
      <NavLink
        to={to()}
        className={({ isActive }) =>
          isActive
            ? `${styles.navLink} ${styles.navLinkActive}`
            : styles.navLink
        }
      >
        <Icon size="2rem" />
        {label}
      </NavLink>
    </li>
  );
};

export function Footer() {
  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          {navItems.map(item => renderLink(item))}
          {/* <li className={styles.navItem}>
            <Link className={styles.navLink} to="/">
              <PiStarFour size="2rem" />
              Daily
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link className={styles.navLink} to="/">
              <HiOutlineViewBoards size="2rem" />
              Board
            </Link>
          </li> */}
          {/* <li className={styles.navItem}>
            <Link className={styles.navLink} to="/">
              <TbLayoutDashboard size="2rem" />
              Dashboard
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}
