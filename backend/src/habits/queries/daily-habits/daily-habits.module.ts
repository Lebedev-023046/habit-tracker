import { Module } from '@nestjs/common';
import { DailyHabitsController } from './daily-habits.controller';
import { DailyHabitsQuery } from './daily-habits.query';

@Module({
  controllers: [DailyHabitsController],
  providers: [DailyHabitsQuery],
})
export class DailyHabitsModule {}
