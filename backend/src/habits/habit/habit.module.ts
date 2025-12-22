import { Module } from '@nestjs/common';
import { TimeService } from 'src/common/utils/time/time.service';
import { HabitRunService } from '../habit-run/habit-run.service';
import { HabitController } from './habit.controller';
import { HabitService } from './habit.service';

@Module({
  providers: [HabitService, HabitRunService, TimeService],
  controllers: [HabitController],
})
export class HabitModule {}
