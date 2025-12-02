import type { AxiosInstance } from 'axios';
import type { CreateHabitFormValues } from '../model/form/schema';

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
    this.createHabit = this.createHabit.bind(this);
    this.getAllHabits = this.getAllHabits.bind(this);
    this.getHabit = this.getHabit.bind(this);
    this.updateHabit = this.updateHabit.bind(this);
    this.deleteHabit = this.deleteHabit.bind(this);
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
  async createHabit(payload: CreateHabitFormValues) {
    try {
      return this.api
        .post(ENDPOINTS.createHabit(), payload)
        .then(res => res.data);
    } catch (error) {
      throw error;
    }
  }

  // TODO: update ANY Type
  async updateHabit(payload: any) {
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
