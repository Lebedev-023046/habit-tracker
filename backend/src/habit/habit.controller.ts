import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateHabitDto, GetHabitsQueryDto, UpdateHabitDto } from './habit.dto';
import { HabitService } from './habit.service';

@Controller('habits')
export class HabitController {
  constructor(private readonly habitService: HabitService) {}

  @Get()
  getAllHabits(@Query() query: GetHabitsQueryDto) {
    return this.habitService.getAllHabits({ status: query.status });
  }
  @Get(':id')
  getHabitById(@Param('id') id: string) {
    return this.habitService.getHabitById(id);
  }

  @Post()
  createHabit(@Body() data: CreateHabitDto) {
    return this.habitService.createHabit(data);
  }

  @Put(':id')
  updateHabit(@Param('id') id: string, @Body() data: UpdateHabitDto) {
    return this.habitService.updateHabit(id, data);
  }

  @Delete(':id')
  deleteHabit(@Param('id') id: string) {
    return this.habitService.deleteHabit(id);
  }
}
