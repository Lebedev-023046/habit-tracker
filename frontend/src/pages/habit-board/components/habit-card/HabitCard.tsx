import type { UpdateHabitFormValues } from '@/entities/habit/model/form/schema';
import type { HabitStatus, HabitTotalDays } from '@/entities/habit/model/types';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { Button } from '@/shared/ui/button';
import { DailyCalendarProgress } from '@/shared/ui/daily-calendar-progress';
import { ProgressBar } from '@/shared/ui/progress-bar';
import { Subtitle } from '@/shared/ui/subtitle';
import { UpdateHabitModalTrigger } from '@/widgets/habit/update/update-habit-modal-trigger';
import { useState } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import styles from './HabitCard.module.css';

const weekdays = [
  {
    weekday: 'monday',
    isDone: Math.random() > 0.5,
  },
  {
    weekday: 'tuesday',
    isDone: Math.random() > 0.5,
  },
  {
    weekday: 'wednesday',
    isDone: Math.random() > 0.5,
  },
  {
    weekday: 'thursday',
    isDone: Math.random() > 0.5,
  },
  {
    weekday: 'friday',
    isDone: Math.random() > 0.5,
  },
  {
    weekday: 'saturday',
    isDone: Math.random() > 0.5,
  },
  {
    weekday: 'sunday',
    isDone: Math.random() > 0.5,
  },
];

interface HabitCardProps {
  id: string;
  title: string;
  totalDays: HabitTotalDays;
  status: HabitStatus;
  startDate?: Date | undefined;
}

export function HabitCard({
  id: habitId,
  title,
  status,
  totalDays,
  startDate,
}: HabitCardProps) {
  const passedDays = 8;

  const updatePayload: UpdateHabitFormValues = {
    title,
    status,
    totalDays,
    startDate,
  };

  const barProgress = (passedDays / totalDays) * 100;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const actionsRef = useClickOutside<HTMLDivElement>(() => {
    if (!isMenuOpen) return;
    setIsMenuOpen(false);
  });

  const handleMenuClick = () => {
    // console.log('CLICKED!');
    setIsMenuOpen(prev => !prev);
  };

  return (
    <div ref={actionsRef} className={styles.habitCard}>
      <h3>{title}</h3>
      <Subtitle>
        {passedDays} / {totalDays} days
      </Subtitle>
      <ProgressBar barHeight="1px" progress={barProgress} />

      <DailyCalendarProgress
        weekdays={weekdays}
        showWeekdayLabels={false}
        dayIndicatorSize="1.3rem"
        dayIndicatorsGap="0.5rem"
      />

      <div className={styles.controls}>
        <Button variant="neutral">Dashboard</Button>
        <Button variant="icon" onClick={handleMenuClick}>
          <HiOutlineDotsHorizontal size="2.5rem" />
        </Button>
      </div>

      <div className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}>
        <div className={styles.menuContent}>
          <div className={styles.menuActions}>
            <UpdateHabitModalTrigger
              onClick={handleMenuClick}
              habitId={habitId}
              defaultValues={updatePayload}
            />
            <Button onClick={handleMenuClick} variant="plain">
              Pause
            </Button>
            <Button onClick={handleMenuClick} variant="plain">
              Move to Built
            </Button>
            <Button
              onClick={handleMenuClick}
              className={styles.menuActionDanger}
              variant="plain"
            >
              Remove
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
