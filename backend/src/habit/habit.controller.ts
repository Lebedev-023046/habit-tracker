import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateHabitDto, UpdateHabitDto } from './habit.dto';
import { HabitService } from './habit.service';

@Controller('habit')
export class HabitController {
  constructor(private readonly habitService: HabitService) {}

  @Get()
  getAllHabits() {
    return this.habitService.getAllHabits();
  }

  @Get(':id')
  getHabitById(@Param('id') id: string) {
    return this.habitService.getHabitById(id);
  }

  @Post('create')
  createHabit(@Body() data: CreateHabitDto) {
    return this.habitService.createHabit(data);
  }

  @Put('update/:id')
  updateHabit(@Param('id') id: string, @Body() data: UpdateHabitDto) {
    return this.habitService.updateHabit(id, data);
  }

  @Delete('delete/:id')
  deleteHabit(@Param('id') id: string) {
    return this.habitService.deleteHabit(id);
  }
}
