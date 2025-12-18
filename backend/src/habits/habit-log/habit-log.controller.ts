import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';

import { UpsertHabitDayLogDto } from './habit-log.dto';
import { HabitLogService } from './habit-log.service';

@Controller('habit-logs')
export class HabitLogController {
  constructor(private readonly habitLogService: HabitLogService) {}

  @Put()
  upsert(@Param('habitId') habitId: string, @Body() dto: UpsertHabitDayLogDto) {
    return this.habitLogService.upsert(habitId, dto.status, dto.date);
  }

  @Delete()
  remove(@Param('habitId') habitId: string, @Query('date') date?: string) {
    return this.habitLogService.remove(
      habitId,
      date ? new Date(date) : undefined,
    );
  }

  @Get()
  getLogs(@Param('habitId') habitId: string) {
    return this.habitLogService.getCurrentRunLogs(habitId);
  }
}
