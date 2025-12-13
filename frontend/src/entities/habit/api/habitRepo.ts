import { api as AxiosApiInstance } from '@/shared/api/instance';
import type { AxiosInstance } from 'axios';

import { buildQueryString } from '@/shared/api/buildQueryString';
import { unwrapResponse } from '@/shared/api/unwrapResponse';
import type { Habit } from '../model/types';
import type {
  CreateHabitPayload,
  DeleteHabitPayload,
  GetAllHabitsQuery,
  HabitReorderPayload,
  UpdateHabitPayload,
  UpdateHabitStatusPayload,
} from './types';

const ENDPOINTS = {
  getAllHabits: (params?: GetAllHabitsQuery) =>
    `/habits${buildQueryString(params)}`,
  getHabit: (id: string) => `/habits/${id}`,
  createHabit: () => '/habits/create',
  updateHabit: (id: string) => `/habits/update/${id}`,
  updateHabitStatus: (id: string) => `habits/update-status/${id}`,
  reorderHabits: () => `/habits/reorder`,
  deleteHabit: (id: string) => `/habits/delete/${id}`,
};

class HabitRepo {
  private api: AxiosInstance;
  constructor(api: AxiosInstance) {
    this.api = api;
    this.createHabit = this.createHabit.bind(this);
    this.getAllHabits = this.getAllHabits.bind(this);
    this.getHabit = this.getHabit.bind(this);
    this.updateHabit = this.updateHabit.bind(this);
    this.reorderHabits = this.reorderHabits.bind(this);
    this.updateHabitStatus = this.updateHabitStatus.bind(this);
    this.deleteHabit = this.deleteHabit.bind(this);
  }
  // private baseHabitKey = ['habit'];

  async getAllHabits(params?: GetAllHabitsQuery): Promise<Habit[]> {
    try {
      return this.api
        .get(ENDPOINTS.getAllHabits(params))
        .then(res => unwrapResponse<Habit[]>(res.data));
    } catch (error) {
      throw error;
    }
  }
  async getHabit(id: string): Promise<Habit> {
    try {
      return this.api
        .get(ENDPOINTS.getHabit(id))
        .then(res => unwrapResponse<Habit>(res.data));
    } catch (error) {
      throw error;
    }
  }
  async createHabit(payload: CreateHabitPayload): Promise<Habit> {
    try {
      return this.api
        .post(ENDPOINTS.createHabit(), payload)
        .then(res => unwrapResponse<Habit>(res.data));
    } catch (error) {
      throw error;
    }
  }

  async updateHabit(payload: UpdateHabitPayload): Promise<Habit> {
    if (!payload.id) {
      throw new Error('Habit id is required');
    }
    try {
      const { id, ...data } = payload;

      return this.api
        .put(ENDPOINTS.updateHabit(id), data)
        .then(res => unwrapResponse<Habit>(res.data));
    } catch (error) {
      throw error;
    }
  }

  async updateHabitStatus(payload: UpdateHabitStatusPayload): Promise<Habit> {
    try {
      const { id, status } = payload;
      return this.api
        .patch(ENDPOINTS.updateHabitStatus(id), { status })
        .then(res => unwrapResponse<Habit>(res.data));
    } catch (error) {
      throw error;
    }
  }

  async reorderHabits(payload: HabitReorderPayload[]): Promise<Habit[]> {
    try {
      return this.api
        .patch(ENDPOINTS.reorderHabits(), { updates: payload })
        .then(res => unwrapResponse<Habit[]>(res.data));
    } catch (error) {
      throw error;
    }
  }

  async deleteHabit(payload: DeleteHabitPayload): Promise<string> {
    try {
      const { id } = payload;
      return this.api
        .delete(ENDPOINTS.deleteHabit(id))
        .then(res => unwrapResponse<string>(res.data));
    } catch (error) {
      throw error;
    }
  }
}

export const habitRepo = new HabitRepo(AxiosApiInstance);
