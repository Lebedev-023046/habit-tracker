import { LogoutButton } from '@/features/auth/logout/ui/logout-button';
import { usePageTitle } from '@/shared/lib/usePageTitle';
import { Typography } from '@/shared/ui/typography';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { GiProgression } from 'react-icons/gi';
import { IoSettingsOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

export function Header() {
  const title = usePageTitle();
  return (
    <header className={styles.headerWrapper}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <GiProgression size="2.5rem" color="var(--bg-color-secondary)" />
          <Link className={styles.title} to="/">
            Habit Flow
          </Link>
        </div>
        <div className={styles.titleContainer}>
          <Typography variant="pageTitle">{title}</Typography>
        </div>
        <div className={styles.controls}>
          <AiOutlineQuestionCircle size="2rem" />
          <IoSettingsOutline size="2rem" />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
