import { Module } from '@nestjs/common';

import { HabitDashboardController } from './habit-dashboard.controller';
import { HabitDashboardOverviewQuery } from './habit-dashboard.service';

@Module({
  controllers: [HabitDashboardController],
  providers: [HabitDashboardOverviewQuery],
})
export class HabitDashboardModule {}
