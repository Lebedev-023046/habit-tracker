import { api as AxiosApiInstance } from '@/shared/api/instance';
import type { AxiosInstance } from 'axios';
import type { UpsertHabitLogPayload } from './types';

const ENDPOINTS = {
  upsertHabitLog: () => '/habit-logs/upsert',
  // createHabitLog: () => '/habit-logs/create',
  // updateHabitLog: (id: string) => `/habit-logs/update/${id}`,
  deleteHabitLog: (id: string) => `/habit-logs/delete/${id}`,
};

class HabitLogRepo {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;

    this.upsertHabitLog = this.upsertHabitLog.bind(this);
    // this.createHabitLog = this.createHabitLog.bind(this);
    // this.updateHabitLog = this.updateHabitLog.bind(this);
    this.deleteHabitLog = this.deleteHabitLog.bind(this);
  }

  async upsertHabitLog(payload: UpsertHabitLogPayload) {
    try {
      return this.api
        .put(ENDPOINTS.upsertHabitLog(), payload)
        .then(res => res.data);
    } catch (error) {
      throw error;
    }
  }

  // async createHabitLog(payload: CreateHabitLogPayload) {
  //   try {
  //     return this.api
  //       .post(ENDPOINTS.createHabitLog(), payload)
  //       .then(res => res.data);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  // async updateHabitLog(payload: UpdateHabitLogPayload) {
  //   if (!payload.id) {
  //     throw new Error('Habit id is required');
  //   }
  //   try {
  //     const { id, ...data } = payload;
  //     return this.api
  //       .patch(ENDPOINTS.updateHabitLog(id), data)
  //       .then(res => res.data);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async deleteHabitLog(id: string) {
    try {
      return this.api
        .delete(ENDPOINTS.deleteHabitLog(id))
        .then(res => res.data);
    } catch (error) {
      throw error;
    }
  }
}

export const habitLogRepo = new HabitLogRepo(AxiosApiInstance);
