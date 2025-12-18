import type { HabitListItem } from '@/entities/habit/model/services/habitList.service';
import { ROUTES } from '@/shared/config/routes';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { usePlural } from '@/shared/hooks/usePlural';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { DailyCalendarProgress } from '@/shared/ui/daily-calendar-progress';
import { ProgressBar } from '@/shared/ui/progress-bar';
import { Typography } from '@/shared/ui/typography';
import { useRef, useState } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { TbPointFilled } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { Chip } from '../chip';
import { HabitActionsMenu } from '../habit-actions-menu';
import styles from './HabitItem.module.css';

interface HabitItemProps {
  item: HabitListItem;
}

export function HabitItem({ item }: HabitItemProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuIconRef = useRef<HTMLButtonElement>(null);
  const { ref } = useClickOutside<HTMLDivElement>(() => setIsMenuOpen(false), {
    ignoreRefs: [menuIconRef],
  });

  const { pluralize } = usePlural();
  const updateMenuState = (state: boolean) => setIsMenuOpen(state);

  return (
    <Container className={`${styles.item}`}>
      <div className={styles.itemHeader}>
        <Typography variant="sectionTitle">{item.title}</Typography>
        <Chip status={item.status}>{item.status}</Chip>
      </div>
      <div className={styles.itemContent}>
        <div className={styles.progress}>
          <Typography variant="subtitleMuted">Progress</Typography>
          <div className={styles.stats}>
            <Typography variant="subtitle">{item.progress}%</Typography>
            <TbPointFilled size={10} />
            <Typography variant="subtitle">
              {item.daySinceStart} / {item.totalDays}
            </Typography>
          </div>
        </div>
        <ProgressBar progress={item.progress} barHeight="0.5rem" />
        <div className={styles.lastDays}>
          <Typography variant="subtitleMuted">Last 7 days</Typography>
          <DailyCalendarProgress
            dayIndicatorsGap="0.5rem"
            dayIndicatorSize="1.3rem"
            showWeekdayLabels={false}
            lastDaysProgress={item.lastDaysProgress}
          />
        </div>
      </div>
      <div className={styles.itemFooter}>
        <div className={styles.streaks}>
          <Typography variant="subtitleMuted">
            Current streak: {pluralize(item.currentStreak)}
          </Typography>
          <TbPointFilled size={15} color="var(--text-color-secondary)" />
          <Typography variant="subtitleMuted">
            {item.bestStreak === item.currentStreak
              ? "It's your longest streak!"
              : `Longest: ${pluralize(item.bestStreak)}`}
          </Typography>
        </div>
        <div className={styles.controls}>
          <Button variant="neutral">
            <Link to={ROUTES.habitDashboard(item.id)}>View Dashboard</Link>
          </Button>
          <Button
            ref={menuIconRef}
            variant="icon"
            className={styles.menuButton}
            onClick={() => setIsMenuOpen(prev => !prev)}
          >
            <HiOutlineDotsHorizontal size={24} />
          </Button>
        </div>
      </div>

      <HabitActionsMenu
        item={item}
        open={isMenuOpen}
        updateMenuState={updateMenuState}
        ref={ref}
      />
    </Container>
  );
}
