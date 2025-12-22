import { Module } from '@nestjs/common';
import { TimeService } from 'src/common/utils/time/time.service';
import { DailyHabitsController } from './daily-habits.controller';
import { DailyHabitsQuery } from './daily-habits.query';

@Module({
  controllers: [DailyHabitsController],
  providers: [DailyHabitsQuery, TimeService],
})
export class DailyHabitsModule {}
