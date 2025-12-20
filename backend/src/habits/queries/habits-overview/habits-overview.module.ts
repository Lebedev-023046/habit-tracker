import { Module } from '@nestjs/common';

import { HabitsOverviewController } from './habits-overview.controller';
import { HabitsOverviewQuery } from './habits-overview.query';

@Module({
  controllers: [HabitsOverviewController],
  providers: [HabitsOverviewQuery],
})
export class HabitOverviewModule {}
