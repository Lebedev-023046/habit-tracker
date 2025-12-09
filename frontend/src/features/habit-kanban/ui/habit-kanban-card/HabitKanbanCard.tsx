import type { UpdateHabitFormValues } from '@/entities/habit/model/form/schema';
import type { HabitBoardViewModel } from '@/entities/habit/model/services/habitBoard.service';
import { DeleteHabitModalTrigger } from '@/features/habit/delete/ui/delete-habit-modal-trigger';
import { UpdateHabitModalTrigger } from '@/features/habit/update/ui/update-habit-modal-trigger';
import { useClickOutside } from '@/shared/hooks/useClickOutside';
import { Button } from '@/shared/ui/button';
import { DailyCalendarProgress } from '@/shared/ui/daily-calendar-progress';
import { ProgressBar } from '@/shared/ui/progress-bar';
import { Subtitle } from '@/shared/ui/subtitle';
import { getUserDayUTC } from '@/shared/utils/time';
import { Draggable } from '@hello-pangea/dnd';
import { useState } from 'react';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import styles from './HabitKanbanCard.module.css';

type HabitCardProps = HabitBoardViewModel;

export function HabitKanbanCard(props: HabitCardProps) {
  const {
    id: habitId,
    title,
    status,
    totalDays,
    startDate,
    position,
    daySinceStart,
    lastWeekProgress,
  } = props;

  const updatePayload: UpdateHabitFormValues = {
    title,
    status,
    totalDays,
    startDate: startDate ? getUserDayUTC(new Date(startDate)) : undefined,
  };

  const barProgress = (daySinceStart / totalDays) * 100;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const actionsRef = useClickOutside<HTMLDivElement>(() => {
    if (!isMenuOpen) return;
    setIsMenuOpen(false);
  });

  const handleMenuClick = () => setIsMenuOpen(prev => !prev);

  return (
    <>
      <Draggable draggableId={habitId} index={position}>
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
                {daySinceStart} / {totalDays} days
              </Subtitle>
              <ProgressBar barHeight="1px" progress={barProgress} />

              <DailyCalendarProgress
                lastWeekProgress={lastWeekProgress}
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
