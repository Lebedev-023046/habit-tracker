import { HabitStatus } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateHabitDto {
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsEnum(HabitStatus, {
    message: `Status must be one of: ${Object.values(HabitStatus).join(', ')}`,
  })
  status: HabitStatus;

  @IsNumber()
  @Min(21, { message: 'Total days must be at least 21' })
  totalDays: number;

  @IsOptional()
  @IsDate({ message: 'Start date must be a valid date' })
  @Type(() => Date)
  startDate?: Date;

  @IsOptional()
  @IsDate({ message: 'End date must be a valid date' })
  @Type(() => Date)
  endDate?: Date;
}

export class UpdateHabitDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty({ message: 'Title cannot be empty' })
  title?: string;

  @IsOptional()
  @IsEnum(HabitStatus, {
    message: `Status must be one of: ${Object.values(HabitStatus).join(', ')}`,
  })
  status?: HabitStatus;

  @IsOptional()
  @IsNumber()
  @Min(21, { message: 'Total days must be at least 21' })
  totalDays?: number;

  @IsOptional()
  @IsDate({ message: 'Start date must be a valid date' })
  @Type(() => Date)
  startDate?: Date;

  @IsOptional()
  @IsDate({ message: 'End date must be a valid date' })
  @Type(() => Date)
  endDate?: Date;
}

export class ReorderHabitDto {
  id: string;
  status: HabitStatus;
  position: number;
}

export class ReorderHabitsDto {
  @IsArray()
  @ValidateNested({ each: true })
  updates: ReorderHabitDto[];
}
