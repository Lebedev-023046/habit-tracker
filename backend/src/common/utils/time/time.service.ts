// src/utils/time/time.service.ts

import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { startOfDay } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

@Injectable()
export class TimeService {
  // ПОКА: без пользователей
  private readonly timezone = 'UTC';

  today(user: User, date = new Date()): Date {
    const utcDate = toZonedTime(date, user.timezone ?? this.timezone);
    return startOfDay(utcDate);
  }
}
