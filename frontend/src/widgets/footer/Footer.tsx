import { ROUTES } from '@/shared/config/routes';
import type { IconType } from 'react-icons';
import { PiStarFour } from 'react-icons/pi';
import { TfiList } from 'react-icons/tfi';
import { NavLink } from 'react-router-dom';
import styles from './Footer.module.css';

const navItems = [
  { to: ROUTES.home, label: 'Daily', Icon: PiStarFour },
  { to: ROUTES.HabitManagement, label: 'Habits', Icon: TfiList },
];

const Link = ({
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
    <footer className={styles.footerWrapper}>
      <div className={`${styles.footer}`}>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {navItems.map(item => (
              <Link key={item.to()} {...item} />
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
