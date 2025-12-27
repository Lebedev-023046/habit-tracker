// src/utils/time/time.service.ts

import { Injectable } from '@nestjs/common';
import { startOfDay } from 'date-fns';
import { fromZonedTime } from 'date-fns-tz';

@Injectable()
export class TimeService {
  // ПОКА: без пользователей
  private readonly timezone = 'UTC';

  today(date = new Date()): Date {
    return fromZonedTime(startOfDay(date), this.timezone);
  }
}
