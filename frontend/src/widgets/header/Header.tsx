import { usePageTitle } from '@/shared/lib/usePageTitle';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { GiProgression } from 'react-icons/gi';
import { IoSettingsOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export function Header() {
  const title = usePageTitle();
  return (
    <div className={styles.wrapper}>
      <div className={styles.subtitle}>
        <GiProgression size="2.5rem" color="var(--bg-color-secondary)" />
        <Link to="/">Habit Flow</Link>
      </div>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{title}</h1>
      </div>
      <div className={styles.controls}>
        <AiOutlineQuestionCircle />
        <IoSettingsOutline />
      </div>
    </div>
  );
}
