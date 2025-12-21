import { Module } from '@nestjs/common';
import { HabitRunService } from './habit-run.service';
import { HabitRunController } from './habit-run.controller';

@Module({
  controllers: [HabitRunController],
  providers: [HabitRunService],
})
export class HabitRunModule {}
