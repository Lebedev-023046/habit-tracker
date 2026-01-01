import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { HabitDashboardOverviewQuery } from './habit-dashboard.query';

@Controller('habits/:habitId/dashboard')
export class HabitDashboardController {
  constructor(
    private readonly habitDashboardService: HabitDashboardOverviewQuery,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHabitDashboard(@Param('habitId') habitId: string) {
    return this.habitDashboardService.getHabitDashboardOverview(habitId);
  }
}
