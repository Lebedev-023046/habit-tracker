import { Controller, Get } from '@nestjs/common';
import { DailyHabitsQuery } from './daily-habits.query';

@Controller('daily-habits')
export class DailyHabitsController {
  constructor(private readonly habitOverviewQuery: DailyHabitsQuery) {}

  @Get()
  async getList() {
    const data = await this.habitOverviewQuery.getDailyHabits();
    console.log({ data });
    return data;
  }
}
