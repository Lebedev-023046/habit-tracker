import { HabitDayStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional } from 'class-validator';

export class UpsertHabitDayLogDto {
  @IsEnum(HabitDayStatus)
  status: HabitDayStatus;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date;
}
