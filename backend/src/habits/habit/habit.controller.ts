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
import { JwtPayload } from 'src/auth/types/jwt-payload.type';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { CreateHabitDto, GetHabitsQueryDto, UpdateHabitDto } from './habit.dto';
import { HabitService } from './habit.service';

@Controller('habits')
export class HabitController {
  constructor(private readonly habitService: HabitService) {}

  @Get()
  getAllHabits(
    @CurrentUser() user: JwtPayload,
    @Query() query: GetHabitsQueryDto,
  ) {
    return this.habitService.getAllHabits(user.sub, { status: query.status });
  }
  @Get(':id')
  getHabitById(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.habitService.getHabitById(user.sub, id);
  }

  @Post()
  createHabit(@CurrentUser() user: JwtPayload, @Body() data: CreateHabitDto) {
    return this.habitService.createHabitWithOptionalStart(
      user.sub,
      user.timezone,
      data,
    );
  }

  @Put(':id')
  updateHabit(
    @Param('id') id: string,
    @CurrentUser() user: JwtPayload,
    @Body() data: UpdateHabitDto,
  ) {
    return this.habitService.updateHabit(user.sub, id, data);
  }

  @Delete(':id')
  deleteHabit(@Param('id') id: string, @CurrentUser() user: JwtPayload) {
    return this.habitService.deleteHabit(user.sub, id);
  }
}
