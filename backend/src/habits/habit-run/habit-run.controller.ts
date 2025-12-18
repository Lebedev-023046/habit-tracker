import { Body, Controller, Param, Post } from '@nestjs/common';
import { ResetHabitRunDto, StartHabitRunDto } from './habit-run.dto';
import { HabitRunService } from './habit-run.service';

@Controller('habits/:habitId/run')
export class HabitRunController {
  constructor(private readonly habitRunService: HabitRunService) {}

  @Post('start')
  start(@Param('habitId') habitId: string, @Body() dto: StartHabitRunDto) {
    return this.habitRunService.start(habitId, dto.totalDays);
  }

  @Post('pause')
  pause(@Param('habitId') habitId: string) {
    return this.habitRunService.pause(habitId);
  }

  @Post('resume')
  resume(@Param('habitId') habitId: string) {
    return this.habitRunService.resume(habitId);
  }

  @Post('build')
  build(@Param('habitId') habitId: string) {
    return this.habitRunService.build(habitId);
  }

  @Post('cancel')
  cancel(@Param('habitId') habitId: string) {
    return this.habitRunService.cancel(habitId);
  }

  @Post('reset')
  reset(@Param('habitId') habitId: string, @Body() dto: ResetHabitRunDto) {
    return this.habitRunService.reset(habitId, dto.totalDays);
  }
}
