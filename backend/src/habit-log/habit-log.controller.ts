import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateHabitLogDto, UpdateHabitLogDto } from './habit-log.dto';
import { HabitLogService } from './habit-log.service';

@Controller('habit-log')
export class HabitLogController {
  constructor(private readonly habitLogService: HabitLogService) {}

  @Get()
  getAllHAbitLogs() {
    return this.habitLogService.getAllHabitLogs();
  }

  @Get(':id')
  getHabitLogById(@Param('id') id: string) {
    return this.habitLogService.getHabitLogById(id);
  }

  @Post('create')
  createHabit(@Body() data: CreateHabitLogDto) {
    return this.habitLogService.createHabitLog(data);
  }

  @Put('update/:id')
  updateHabit(@Param('id') id: string, @Body() data: UpdateHabitLogDto) {
    return this.habitLogService.updateHabitLog(id, data);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.habitLogService.deleteHabitLog(id);
  }
}
