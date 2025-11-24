import type { AxiosInstance } from 'axios';
import type { CreateHabitPayload, UpdateHabitPayload } from '../model/types';

const ENDPOINTS = {
  getAllHabits: () => `/habits`,
  getHabit: (id: string) => `/habits/${id}`,
  createHabit: () => '/habits/create',
  updateHabit: (id: string) => `/habits/update/${id}`,
  deleteHabit: (id: string) => `/habits/delete/${id}`,
};

export class HabitRepo {
  private api: AxiosInstance;
  constructor(api: AxiosInstance) {
    this.api = api;
  }
  // private baseHabitKey = ['habit'];

  async getAllHabits() {
    try {
      return this.api.get(ENDPOINTS.getAllHabits()).then(res => res.data);
    } catch (error) {
      throw error;
    }
  }
  async getHabit(id: string) {
    try {
      return this.api.get(ENDPOINTS.getHabit(id)).then(res => res.data);
    } catch (error) {
      throw error;
    }
  }
  async createHabit(payload: CreateHabitPayload) {
    try {
      return this.api
        .post(ENDPOINTS.createHabit(), payload)
        .then(res => res.data);
    } catch (error) {
      throw error;
    }
  }
  async updateHabit(payload: UpdateHabitPayload) {
    if (!payload.id) {
      throw new Error('Habit id is required');
    }
    try {
      const { id, ...data } = payload;

      return this.api
        .put(ENDPOINTS.updateHabit(id), data)
        .then(res => res.data);
    } catch (error) {
      throw error;
    }
  }
  async deleteHabit(id: string) {
    try {
      return this.api.delete(ENDPOINTS.deleteHabit(id)).then(res => res.data);
    } catch (error) {
      throw error;
    }
  }
}
