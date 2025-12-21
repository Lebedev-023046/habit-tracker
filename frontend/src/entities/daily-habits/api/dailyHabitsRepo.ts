import { api as AxiosApiInstance } from '@/shared/api/instance';
import { unwrapResponse } from '@/shared/api/unwrapResponse';
import type { AxiosInstance } from 'axios';
import type { DailyHabitsInfo } from '../types';

const ENDPOINTS = {
  getDailyHabits: () => '/daily-habits',
};

class DailyHabitsRepo {
  private api: AxiosInstance;
  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getDailyHabits(): Promise<DailyHabitsInfo> {
    return this.api
      .get(ENDPOINTS.getDailyHabits())
      .then(res => unwrapResponse<any>(res.data));
  }
}

export const dailyHabitsRepo = new DailyHabitsRepo(AxiosApiInstance);
