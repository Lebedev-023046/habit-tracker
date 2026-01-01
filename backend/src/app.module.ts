import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { PrismaModule } from './prisma/prisma.module';

import { HabitLogModule } from './habits/habit-log/habit-log.module';
import { HabitRunModule } from './habits/habit-run/habit-run.module';
import { HabitModule } from './habits/habit/habit.module';

import { AuthModule } from './auth/auth.module';
import { DailyHabitsModule } from './habits/queries/daily-habits/daily-habits.module';
import { HabitDashboardModule } from './habits/queries/habit-dashboard/habit-dashboard.module';
import { HabitOverviewModule } from './habits/queries/habits-overview/habits-overview.module';
import { HealthModule } from './health/health.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    HealthModule,
    ScheduleModule.forRoot(),

    PrismaModule,

    // auth
    AuthModule,
    UserModule,

    // COMMAND side

    HabitModule,
    HabitLogModule,
    HabitRunModule,

    // QUERY side
    DailyHabitsModule,
    HabitDashboardModule,
    HabitOverviewModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
