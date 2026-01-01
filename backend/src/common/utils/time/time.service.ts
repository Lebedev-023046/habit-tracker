// src/utils/time/time.service.ts

import { Injectable } from '@nestjs/common';
import { startOfDay } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

@Injectable()
export class TimeService {
  private readonly fallbackTimezone = 'UTC';

  now(timezone?: string, date = new Date()): Date {
    return toZonedTime(date, timezone ?? this.fallbackTimezone);
  }

  today(timezone: string, date = new Date()): Date {
    const utcDate = toZonedTime(date, timezone ?? this.fallbackTimezone);
    return startOfDay(utcDate);
  }
}
