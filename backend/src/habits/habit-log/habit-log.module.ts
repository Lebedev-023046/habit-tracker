import { Module } from '@nestjs/common';
import { TimeService } from 'src/common/utils/time/time.service';
import { HabitLogController } from './habit-log.controller';
import { HabitLogService } from './habit-log.service';

@Module({
  controllers: [HabitLogController],
  providers: [HabitLogService, TimeService],
})
export class HabitLogModule {}
