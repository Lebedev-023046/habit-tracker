import { Module } from '@nestjs/common';
import { HabitsCronService } from './cron/habits-cron.service';
import { HabitController } from './habit.controller';
import { HabitService } from './habit.service';

@Module({
  providers: [HabitService, HabitsCronService],
  controllers: [HabitController],
})
export class HabitModule {}
