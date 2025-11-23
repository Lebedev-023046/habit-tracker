import { HabitDayStatus } from '@prisma/client';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';

// export type CreateHabitLogDto = Prisma.HabitDayLogCreateInput;
// export type UpdateHabitLogDto = Prisma.HabitDayLogUpdateInput;

export class CreateHabitLogDto {
  @IsUUID()
  @IsNotEmpty({ message: 'Habit ID is required' })
  habitId: string;

  @IsEnum(HabitDayStatus, {
    message: `Status must be one of: ${Object.values(HabitDayStatus).join(', ')}`,
  })
  status: HabitDayStatus;

  @IsDate({ message: 'Date must be a valid date' })
  date: Date;
}

export class UpdateHabitLogDto {
  @IsOptional()
  @IsEnum(HabitDayStatus, {
    message: `Status must be one of: ${Object.values(HabitDayStatus).join(', ')}`,
  })
  status?: HabitDayStatus;
}
