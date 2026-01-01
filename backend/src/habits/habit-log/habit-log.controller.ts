import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
} from '@nestjs/common';

import { JwtPayload } from 'src/auth/types/jwt-payload.type';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { UpsertHabitDayLogDto } from './habit-log.dto';
import { HabitLogService } from './habit-log.service';

@Controller('habits/:habitId/day-log')
export class HabitLogController {
  constructor(private readonly habitLogService: HabitLogService) {}

  @Put()
  upsert(
    @Param('habitId') habitId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: UpsertHabitDayLogDto,
  ) {
    return this.habitLogService.upsert(
      user.sub,
      user.timezone,
      habitId,
      dto.status,
      dto.date,
    );
  }

  @Delete()
  remove(
    @Param('habitId') habitId: string,
    @CurrentUser() user: JwtPayload,
    @Query('date') date?: string,
  ) {
    return this.habitLogService.remove(
      user.sub,
      user.timezone,
      habitId,
      date ? new Date(date) : undefined,
    );
  }

  @Get()
  getLogs(@Param('habitId') habitId: string, @CurrentUser() user: JwtPayload) {
    return this.habitLogService.getCurrentRunLogs(user.sub, habitId);
  }
}
