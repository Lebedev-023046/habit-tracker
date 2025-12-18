import { HABIT_ACTIONS_BY_STATUS } from '@/entities/habit/model/actions/constants';
import type { HabitListItem } from '@/entities/habit/model/services/habitList.service';
import { forwardRef } from 'react';

import { ACTION_RENDERERS } from '@/entities/habit/model/actions/render-mapper';
import { Typography } from '@/shared/ui/typography';
import styles from './HabitActionsMenu.module.css';

interface HabitActionsMenuProps {
  item: HabitListItem;
  open: boolean;
  ref?: React.Ref<HTMLDivElement>;
  updateMenuState: (state: boolean) => void;
}

function HabitActionsMenuBase({
  item,
  open,
  ref,
  updateMenuState,
}: HabitActionsMenuProps) {
  const actions = HABIT_ACTIONS_BY_STATUS[item.status];

  if (!actions.length)
    return <Typography variant="subtitleMuted">No actions</Typography>;

  return (
    <>
      <div
        className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`}
        onClick={() => updateMenuState(false)}
      />
      <div
        ref={ref}
        className={`${styles.sideMenu} ${open ? styles.menuOpen : ''}`}
      >
        <div className={styles.btns}>
          {actions.map(action => {
            const Action = ACTION_RENDERERS[action];

            return (
              <Action
                key={action}
                habit={item}
                variant="plain"
                closeMenu={() => updateMenuState(false)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export const HabitActionsMenu = forwardRef<
  HTMLDivElement,
  HabitActionsMenuProps
>((props, ref) => <HabitActionsMenuBase {...props} ref={ref} />);
