import { Module } from '@nestjs/common';

import { TimeService } from 'src/common/utils/time/time.service';
import { HabitsOverviewController } from './habits-overview.controller';
import { HabitsOverviewQuery } from './habits-overview.query';

@Module({
  controllers: [HabitsOverviewController],
  providers: [HabitsOverviewQuery, TimeService],
})
export class HabitOverviewModule {}
