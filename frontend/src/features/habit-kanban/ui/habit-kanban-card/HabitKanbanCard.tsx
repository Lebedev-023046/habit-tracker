import type { UpdateHabitFormValues } from '@/entities/habit/model/form/schema';
import type { HabitStatus, HabitTotalDays } from '@/entities/habit/model/types';
import { DeleteHabitModalTrigger } from '@/features/habit/delete/ui/delete-habit-modal-trigger';
import { UpdateHabitModalTrigger } from '@/features/habit/update/ui/update-habit-modal-trigger';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { Button } from '@/shared/ui/button';
import { DailyCalendarProgress } from '@/shared/ui/daily-calendar-progress';
import { ProgressBar } from '@/shared/ui/progress-bar';
import { Subtitle } from '@/shared/ui/subtitle';
import { Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import styles from './HabitKanbanCard.module.css';

const weekdays = [
  { weekday: 'monday', isDone: Math.random() > 0.5 },
  { weekday: 'tuesday', isDone: Math.random() > 0.5 },
  { weekday: 'wednesday', isDone: Math.random() > 0.5 },
  { weekday: 'thursday', isDone: Math.random() > 0.5 },
  { weekday: 'friday', isDone: Math.random() > 0.5 },
  { weekday: 'saturday', isDone: Math.random() > 0.5 },
  { weekday: 'sunday', isDone: Math.random() > 0.5 },
];

interface DNDCardProps {
  index: number;
}

interface HabitCardProps extends DNDCardProps {
  id: string;
  title: string;
  totalDays: HabitTotalDays;
  status: HabitStatus;
  startDate?: Date | undefined;
}

export function HabitKanbanCard({
  index,
  id: habitId,
  title,
  status,
  totalDays,
  startDate,
}: HabitCardProps) {
  const passedDays = 8; // TODO: replace it with real data

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
    <>
      <Draggable draggableId={habitId} index={index}>
        {provided => {
          const setRefs = (node: HTMLDivElement | null) => {
            actionsRef.current = node;
            provided.innerRef(node);
          };
          return (
            <div
              ref={setRefs}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={styles.habitCard}
              style={{ ...provided.draggableProps.style }}
            >
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

              <div
                className={`${styles.menu} ${isMenuOpen ? styles.menuOpen : ''}`}
              >
                <div className={styles.menuContent}>
                  <div className={styles.menuActions}>
                    <UpdateHabitModalTrigger
                      onClick={handleMenuClick}
                      habitId={habitId}
                      defaultValues={updatePayload}
                    />
                    <DeleteHabitModalTrigger
                      habitId={habitId}
                      habitTitle={title}
                      onClick={handleMenuClick}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Draggable>
    </>
  );
}
