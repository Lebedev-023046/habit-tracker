import { Controller, Get, Param } from '@nestjs/common';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { HabitDashboardOverviewQuery } from './habit-dashboard.query';

@Controller('habits/:habitId/dashboard')
export class HabitDashboardController {
  constructor(
    private readonly habitDashboardService: HabitDashboardOverviewQuery,
  ) {}

  @Get()
  getHabitDashboard(
    @Param('habitId') habitId: string,
    @CurrentUser() user: JwtPayload,
  ) {
    return this.habitDashboardService.getHabitDashboardOverview(
      habitId,
      user.timezone,
    );
  }
}
