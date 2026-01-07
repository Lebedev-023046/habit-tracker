import { Body, Controller, Param, Post } from '@nestjs/common';
import { JwtPayload } from 'src/auth/types/jwt-payload.type';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { ResetHabitRunDto, StartHabitRunDto } from './habit-run.dto';
import { HabitRunService } from './habit-run.service';

@Controller('habits/:habitId/run')
export class HabitRunController {
  constructor(private readonly habitRunService: HabitRunService) {}

  @Post('start')
  start(
    @Param('habitId') habitId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: StartHabitRunDto,
  ) {
    return this.habitRunService.start(
      user.sub,
      user.timezone,
      habitId,
      dto.totalDays,
    );
  }

  @Post('pause')
  pause(@Param('habitId') habitId: string, @CurrentUser() user: JwtPayload) {
    return this.habitRunService.pause(user.sub, habitId);
  }

  @Post('resume')
  resume(@Param('habitId') habitId: string, @CurrentUser() user: JwtPayload) {
    return this.habitRunService.resume(user.sub, habitId);
  }

  @Post('build')
  build(@Param('habitId') habitId: string, @CurrentUser() user: JwtPayload) {
    return this.habitRunService.build(user.sub, user.timezone, habitId);
  }

  @Post('cancel')
  cancel(@Param('habitId') habitId: string, @CurrentUser() user: JwtPayload) {
    return this.habitRunService.cancel(user.sub, user.timezone, habitId);
  }

  @Post('reset')
  reset(
    @Param('habitId') habitId: string,
    @CurrentUser() user: JwtPayload,
    @Body() dto: ResetHabitRunDto,
  ) {
    return this.habitRunService.reset(
      user.sub,
      user.timezone,
      habitId,
      dto.totalDays,
    );
  }
}
