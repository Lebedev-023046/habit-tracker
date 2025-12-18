import { Controller, Get, Param } from '@nestjs/common';
import { HabitDashboardService } from './habit-dashboard.service';

@Controller('habits/:habitId/dashboard')
export class HabitDashboardController {
  constructor(private readonly habitDashboardService: HabitDashboardService) {}

  @Get()
  getDashboard(@Param('habitId') habitId: string) {
    return this.habitDashboardService.getDashboard(habitId);
  }
}
