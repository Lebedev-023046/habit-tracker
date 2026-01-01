import { Controller, Get } from '@nestjs/common';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { DailyHabitsQuery } from './daily-habits.query';

@Controller('daily-habits')
export class DailyHabitsController {
  constructor(private readonly habitOverviewQuery: DailyHabitsQuery) {}

  @Get()
  async getList(@CurrentUser() user: JwtPayload) {
    const data = await this.habitOverviewQuery.getDailyHabits(
      user.sub,
      user.timezone,
    );
    return data;
  }
}
