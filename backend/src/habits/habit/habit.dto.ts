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
}

export class UpdateHabitDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  title?: string;
}
