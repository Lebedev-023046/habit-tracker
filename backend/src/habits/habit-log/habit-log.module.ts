import { Module } from '@nestjs/common';
import { HabitLogService } from './habit-log.service';
import { HabitLogController } from './habit-log.controller';

@Module({
  controllers: [HabitLogController],
  providers: [HabitLogService],
})
export class HabitLogModule {}
