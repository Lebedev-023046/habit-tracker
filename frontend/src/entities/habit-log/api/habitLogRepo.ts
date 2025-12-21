import type { HabitDayLog } from '@/entities/habit/model/types';
import { api as AxiosApiInstance } from '@/shared/api/instance';
import { unwrapResponse } from '@/shared/api/unwrapResponse';
import type { DateValue } from '@/shared/types';
import type { AxiosInstance } from 'axios';
import type { UpsertHabitLogPayload } from './types';

const ENDPOINTS = {
  get: (habitId: string) => `habits/${habitId}/day-log`,
  upsert: (habitId: string) => `habits/${habitId}/day-log`,
  delete: (habitId: string) => `habits/${habitId}/day-log`,
};

class HabitLogRepo {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
    this.getHabitLogs = this.getHabitLogs.bind(this);
    this.upsertHabitLog = this.upsertHabitLog.bind(this);
    this.deleteHabitLog = this.deleteHabitLog.bind(this);
  }

  async getHabitLogs(habitId: string): Promise<HabitDayLog[]> {
    return this.api
      .get(ENDPOINTS.get(habitId))
      .then(res => unwrapResponse<HabitDayLog[]>(res.data));
  }

  async upsertHabitLog(payload: UpsertHabitLogPayload): Promise<HabitDayLog> {
    const { habitId, ...body } = payload;

    return this.api
      .put(ENDPOINTS.upsert(habitId), body)
      .then(res => unwrapResponse<HabitDayLog>(res.data));
  }

  async deleteHabitLog(habitId: string, date?: DateValue): Promise<boolean> {
    return this.api
      .delete(ENDPOINTS.delete(habitId), {
        params: date ? { date } : undefined,
      })
      .then(res => unwrapResponse(res.data));
  }
}

export const habitLogRepo = new HabitLogRepo(AxiosApiInstance);
