import { Module } from '@nestjs/common';
import { TimeService } from 'src/common/utils/time/time.service';
import { HabitRunController } from './habit-run.controller';
import { HabitRunService } from './habit-run.service';

@Module({
  controllers: [HabitRunController],
  providers: [HabitRunService, TimeService],
})
export class HabitRunModule {}
