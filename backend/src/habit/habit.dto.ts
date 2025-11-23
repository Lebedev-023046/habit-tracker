import { HabitStatus } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

// export type CreateHabitDto = Pick<
//   Prisma.HabitCreateInput,
//   'title' | 'status' | 'totalDays' | 'startDate' | 'endDate'
// >;

// export type UpdateHabitDto = Pick<
//   Prisma.HabitUpdateInput,
//   'title' | 'status' | 'totalDays' | 'startDate' | 'endDate'
// >;

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
  startDate?: Date;

  @IsOptional()
  @IsDate({ message: 'End date must be a valid date' })
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
  startDate?: Date;

  @IsOptional()
  @IsDate({ message: 'End date must be a valid date' })
  endDate?: Date;
}
