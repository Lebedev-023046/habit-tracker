import type { HabitDayLog } from '@/entities/habit/model/types';
import { api as AxiosApiInstance } from '@/shared/api/instance';
import { unwrapResponse } from '@/shared/api/unwrapResponse';
import type { DateValue } from '@/shared/types';
import type { AxiosInstance } from 'axios';
import type { UpsertHabitLogPayload } from './types';

const ENDPOINTS = {
  logs: (habitId: string) => `/habits/${habitId}/logs`,
};

class HabitLogRepo {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getHabitLogs(habitId: string): Promise<HabitDayLog[]> {
    return this.api
      .get(ENDPOINTS.logs(habitId))
      .then(res => unwrapResponse<HabitDayLog[]>(res.data));
  }

  async upsertHabitLog(payload: UpsertHabitLogPayload): Promise<HabitDayLog> {
    const { habitId, ...body } = payload;

    return this.api
      .put(ENDPOINTS.logs(habitId), body)
      .then(res => unwrapResponse<HabitDayLog>(res.data));
  }

  async deleteHabitLog(habitId: string, date?: DateValue): Promise<boolean> {
    return this.api
      .delete(ENDPOINTS.logs(habitId), {
        params: date ? { date } : undefined,
      })
      .then(res => unwrapResponse(res.data));
  }
}

export const habitLogRepo = new HabitLogRepo(AxiosApiInstance);
