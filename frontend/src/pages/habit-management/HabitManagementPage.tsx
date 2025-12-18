import type { HabitStatus } from '@/entities/habit';
import { HABIT_STATUS_MAP } from '@/entities/habit/model/constants';
import { useHabitsList } from '@/entities/habit/model/view/useHabitsList';
import { CreateHabitModalTrigger } from '@/features/habit/create';
import { Button } from '@/shared/ui/button';
import { Container } from '@/shared/ui/container';
import { Typography } from '@/shared/ui/typography';
import { useState } from 'react';
import styles from './HabitManagementPage.module.css';
import { HabitGroup } from './components/habit-group';
import { HabitItem } from './components/habit-item';

const { active, ...rest } = HABIT_STATUS_MAP;
const filterValues = ['all', active, ...Object.values(rest)] as [
  'all',
  ...HabitStatus[],
];

const groupValues = filterValues.filter(
  value => value !== 'all',
) as HabitStatus[];

const NoGroupItemMessage = ({ status }: { status: HabitStatus }) => (
  <div className={styles.noItemsContent}>
    <Typography variant="sectionTitle">No habits here yet</Typography>
    <Typography variant="subtitleMuted">
      Move a habit to {status} to see it here
    </Typography>
  </div>
);

export default function HabitManagementPage() {
  const [activeStatus, setActiveStatus] = useState<string>(filterValues[0]);

  const valuesToDisplay =
    activeStatus === 'all' ? groupValues : [activeStatus as HabitStatus];

  const { viewModel, isInitialLoading } = useHabitsList();

  const updateStatus = (status: string) => setActiveStatus(status);

  if (isInitialLoading) {
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
            const habitLengthLabel = viewModel[status as HabitStatus]
              ? `(${viewModel[status as HabitStatus].length})`
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
          const isEmptyGroup = viewModel[status].length === 0;

          if (isEmptyGroup) {
            if (isAllTab) return null;
            return (
              <HabitGroup key={status} label={status}>
                <NoGroupItemMessage status={status} />
              </HabitGroup>
            );
          }

          return (
            <HabitGroup key={status} label={status}>
              {viewModel[status].map(habit => (
                <HabitItem key={habit.id} item={habit} />
              ))}
            </HabitGroup>
          );
        })}
      </div>
    </Container>
  );
}
