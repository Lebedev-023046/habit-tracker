import { Controller, Get } from '@nestjs/common';

import { JwtPayload } from 'src/auth/types/jwt-payload.type';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { HabitsOverviewQuery } from './habits-overview.query';

@Controller('habits-overview')
export class HabitsOverviewController {
  constructor(private readonly habitOverviewQuery: HabitsOverviewQuery) {}

  @Get()
  getList(@CurrentUser() user: JwtPayload) {
    return this.habitOverviewQuery.getHabitList(user.sub, user.timezone);
  }
}
