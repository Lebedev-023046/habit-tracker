import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { HabitModule } from './habit/habit.module';
import { HabitLogModule } from './habit-log/habit-log.module';

@Module({
  imports: [PrismaModule, HabitModule, HabitLogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
