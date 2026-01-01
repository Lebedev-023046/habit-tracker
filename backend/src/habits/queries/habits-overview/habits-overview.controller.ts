import { Controller, Get, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { HabitsOverviewQuery } from './habits-overview.query';

@Controller('habits-overview')
export class HabitsOverviewController {
  constructor(private readonly habitOverviewQuery: HabitsOverviewQuery) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getList(@CurrentUser() user: JwtPayload) {
    return this.habitOverviewQuery.getHabitList(user.sub, user.timezone);
  }
}
