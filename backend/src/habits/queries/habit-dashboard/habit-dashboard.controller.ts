import { Controller, Get, Param } from '@nestjs/common';
import { HabitDashboardOverviewQuery } from './habit-dashboard.service';

@Controller('habits/:habitId/dashboard')
export class HabitDashboardController {
  constructor(
    private readonly habitDashboardService: HabitDashboardOverviewQuery,
  ) {}

  @Get()
  getHabitDashboard(@Param('habitId') habitId: string) {
    return this.habitDashboardService.getHabitDashboardOverview(habitId);
  }
}
