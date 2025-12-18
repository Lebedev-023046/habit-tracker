import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateHabitDto,
  GetHabitsQueryDto,
  UpdateHabitDto,
  UpdateHabitStatusDto,
} from './habit.dto';
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

  @Post('create')
  createHabit(@Body() data: CreateHabitDto) {
    return this.habitService.createHabit(data);
  }

  @Put('update/:id')
  updateHabit(@Param('id') id: string, @Body() data: UpdateHabitDto) {
    return this.habitService.updateHabit(id, data);
  }

  @Patch('update-status/:id')
  updateHabitStatus(
    @Param('id') id: string,
    @Body() data: UpdateHabitStatusDto,
  ) {
    // console.log(data);
    return this.habitService.updateHabitStatus(id, { status: data?.status });
  }

  @Delete('delete/:id')
  deleteHabit(@Param('id') id: string) {
    return this.habitService.deleteHabit(id);
  }
}
