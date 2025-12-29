// src/utils/time/time.service.ts

import { Injectable } from '@nestjs/common';
import { startOfDay } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

@Injectable()
export class TimeService {
  // ПОКА: без пользователей
  private readonly timezone = 'UTC';

  today(date = new Date()): Date {
    const utcDate = toZonedTime(date, this.timezone);
    return startOfDay(utcDate);
  }
}
