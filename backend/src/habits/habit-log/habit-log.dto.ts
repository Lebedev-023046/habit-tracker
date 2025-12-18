import { HabitDayStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, IsUUID } from 'class-validator';

export class UpsertHabitDayLogDto {
  @IsUUID()
  habitId: string;

  @IsEnum(HabitDayStatus)
  status: HabitDayStatus;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date?: Date;
}
