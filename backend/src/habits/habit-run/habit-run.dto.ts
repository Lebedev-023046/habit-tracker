import { IsNumber, Min } from 'class-validator';

export class StartHabitRunDto {
  @IsNumber()
  @Min(21, { message: 'Total days must be at least 21' })
  totalDays: number;
}

export class ResetHabitRunDto {
  @IsNumber()
  @Min(21, { message: 'Total days must be at least 21' })
  totalDays: number;
}
