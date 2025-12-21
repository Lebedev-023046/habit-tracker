import { api as AxiosApiInstance } from '@/shared/api/instance';
import { unwrapResponse } from '@/shared/api/unwrapResponse';
import type { AxiosInstance } from 'axios';
import type { DashboardHabitItem } from '../types';

const ENDPOINTS = {
  getDashboardOverview: (habitId: string) => `habits/${habitId}/dashboard`,
};

class HabitDashboardRepo {
  private api: AxiosInstance;
  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getDashboardOverview(habitId: string): Promise<DashboardHabitItem> {
    return this.api
      .get(ENDPOINTS.getDashboardOverview(habitId))
      .then(res => unwrapResponse<any>(res.data));
  }
}

export const habitDashboardRepo = new HabitDashboardRepo(AxiosApiInstance);
