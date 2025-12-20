import { Controller, Get } from '@nestjs/common';

import { HabitsOverviewQuery } from './habits-overview.query';

@Controller('habits-overview')
export class HabitsOverviewController {
  constructor(private readonly habitOverviewQuery: HabitsOverviewQuery) {}

  @Get()
  getList() {
    return this.habitOverviewQuery.getHabitList();
  }
}
