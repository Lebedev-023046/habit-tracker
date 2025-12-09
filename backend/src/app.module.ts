import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HabitLogModule } from './habit-log/habit-log.module';
import { HabitModule } from './habit/habit.module';
import { PrismaModule } from './prisma/prisma.module';

import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    PrismaModule,
    HabitModule,
    HabitLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
