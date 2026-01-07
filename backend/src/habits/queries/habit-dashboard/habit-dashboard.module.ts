import { Module } from '@nestjs/common';

import { TimeService } from 'src/common/utils/time/time.service';
import { HabitDashboardController } from './habit-dashboard.controller';
import { HabitDashboardOverviewQuery } from './habit-dashboard.query';

@Module({
  controllers: [HabitDashboardController],
  providers: [HabitDashboardOverviewQuery, TimeService],
})
export class HabitDashboardModule {}
