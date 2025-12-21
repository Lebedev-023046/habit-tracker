import { Module } from '@nestjs/common';
import { HabitRunService } from '../habit-run/habit-run.service';
import { HabitsCronService } from './cron/habits-cron.service';
import { HabitController } from './habit.controller';
import { HabitService } from './habit.service';

@Module({
  providers: [HabitService, HabitRunService, HabitsCronService],
  controllers: [HabitController],
})
export class HabitModule {}
