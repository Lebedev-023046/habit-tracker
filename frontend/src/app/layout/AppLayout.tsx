import { Footer } from '@/widgets/footer/Footer';
import { Header } from '@/widgets/header/Header';
import { Outlet } from 'react-router-dom';

import styles from './AppLayout.module.css';

export default function AppLayout() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
