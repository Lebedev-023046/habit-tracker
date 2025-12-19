import { HabitStatus } from '@prisma/client';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class GetHabitsQueryDto {
  @IsOptional()
  @IsString()
  status?: HabitStatus;
}

export class CreateHabitDto {
  @IsString()
  @IsNotEmpty()
  title: string;
  startImmediately?: boolean;
  totalDays?: number;
}

export class UpdateHabitDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;
}
