import { Module } from '@nestjs/common';
import { HabitDashboardService } from './habit-dashboard.service';
import { HabitDashboardController } from './habit-dashboard.controller';

@Module({
  controllers: [HabitDashboardController],
  providers: [HabitDashboardService],
})
export class HabitDashboardModule {}
