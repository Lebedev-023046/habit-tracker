import styles from './HabitsOverview.module.css';

import type { HabitStatus } from '@/entities/habit';
import { CreateHabitModalTrigger } from '@/features/habit/create';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { Typography } from '@/shared/ui/typography';
import { useState } from 'react';
import { filterValues, groupValues } from '../model/filters';

import { useHabitOverviewList } from '../model/useHabitsList';
import { HabitGroup } from './habit-group';
import { HabitItem } from './habit-item';
import { NoDataMessage } from './no-data-message';

export function HabitsOverview() {
  const [activeStatus, setActiveStatus] = useState<string>(filterValues[0]);

  const valuesToDisplay =
    activeStatus === 'all' ? groupValues : [activeStatus as HabitStatus];

  const { groupedHabits, isLoading } = useHabitOverviewList();

  const updateStatus = (status: string) => setActiveStatus(status);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Container unstyled className={styles.root}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <div>
            <Typography variant="pageTitle">My Habits</Typography>
            <Typography variant="subtitleMuted">
              Manage and track all the routines you're building
            </Typography>
          </div>
          <CreateHabitModalTrigger variant="primary" />
        </div>

        <div className={styles.filter}>
          {filterValues.map(status => {
            const habitLengthLabel = groupedHabits[status as HabitStatus]
              ? `(${groupedHabits[status as HabitStatus].length})`
              : '';

            return (
              <Button
                onClick={() => updateStatus(status)}
                active={status === activeStatus}
                key={status}
                variant="chip"
              >
                {status} {habitLengthLabel}
              </Button>
            );
          })}
        </div>
      </div>
      <div className={styles.body}>
        {valuesToDisplay.map(status => {
          const isAllTab = activeStatus === 'all';
          const isEmptyGroup = groupedHabits[status].length === 0;

          if (isEmptyGroup) {
            if (isAllTab) return null;
            return (
              <HabitGroup key={status} label={status}>
                <NoDataMessage status={status} />
              </HabitGroup>
            );
          }

          return (
            <HabitGroup key={status} label={status}>
              {groupedHabits[status].map(habit => (
                <HabitItem key={habit.id} item={habit} />
              ))}
            </HabitGroup>
          );
        })}
      </div>
    </Container>
  );
}
