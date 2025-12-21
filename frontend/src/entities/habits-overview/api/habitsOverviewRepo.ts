import { api as AxiosApiInstance } from '@/shared/api/instance';
import { unwrapResponse } from '@/shared/api/unwrapResponse';
import type { AxiosInstance } from 'axios';
import type { HabitsOverviewListItem } from '../types';

const ENDPOINTS = {
  list: () => '/habits-overview',
};

class HabitsOverviewRepo {
  private api: AxiosInstance;
  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getList(): Promise<HabitsOverviewListItem[]> {
    return this.api
      .get(ENDPOINTS.list())
      .then(res => unwrapResponse<HabitsOverviewListItem[]>(res.data));
  }
}

export const habitsOverviewRepo = new HabitsOverviewRepo(AxiosApiInstance);
