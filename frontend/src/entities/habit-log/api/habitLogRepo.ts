import type { HabitDayLog } from '@/entities/habit/model/types';
import { api as AxiosApiInstance } from '@/shared/api/instance';
import { unwrapResponse } from '@/shared/api/unwrapResponse';
import type { AxiosInstance } from 'axios';
import type { UpsertHabitLogPayload } from './types';

const ENDPOINTS = {
  upsertHabitLog: () => '/habit-logs/upsert',
  deleteHabitLog: (id: string) => `/habit-logs/delete/${id}`,
};

class HabitLogRepo {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;

    this.upsertHabitLog = this.upsertHabitLog.bind(this);
    this.deleteHabitLog = this.deleteHabitLog.bind(this);
  }

  async upsertHabitLog(payload: UpsertHabitLogPayload): Promise<HabitDayLog> {
    try {
      return this.api
        .put(ENDPOINTS.upsertHabitLog(), payload)
        .then(res => unwrapResponse<HabitDayLog>(res.data));
    } catch (error) {
      throw error;
    }
  }

  async deleteHabitLog(id: string) {
    try {
      return this.api
        .delete(ENDPOINTS.deleteHabitLog(id))
        .then(res => unwrapResponse(res.data));
    } catch (error) {
      throw error;
    }
  }
}

export const habitLogRepo = new HabitLogRepo(AxiosApiInstance);
