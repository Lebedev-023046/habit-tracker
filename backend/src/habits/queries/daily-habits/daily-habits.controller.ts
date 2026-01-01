import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { DailyHabitsQuery } from './daily-habits.query';

@Controller('daily-habits')
export class DailyHabitsController {
  constructor(private readonly habitOverviewQuery: DailyHabitsQuery) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getList(@CurrentUser() user: JwtPayload) {
    const data = await this.habitOverviewQuery.getDailyHabits(
      user.sub,
      user.timezone,
    );
    return data;
  }
}
