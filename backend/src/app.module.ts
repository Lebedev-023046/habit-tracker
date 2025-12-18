import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitLogModule } from './habits/habit-log/habit-log.module';
import { HabitModule } from './habits/habit/habit.module';
import { PrismaModule } from './prisma/prisma.module';

import { ScheduleModule } from '@nestjs/schedule';
import { HabitDashboardModule } from './habits/habit-dashboard/habit-dashboard.module';
import { HabitRunModule } from './habits/habit-run/habit-run.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    HabitModule,
    HabitLogModule,
    HabitRunModule,
    HabitDashboardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
