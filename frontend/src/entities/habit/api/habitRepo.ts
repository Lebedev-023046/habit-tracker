import type { AxiosInstance } from 'axios';

const ENDPOINTS = {
  getAllHabits: () => `/habits`,
  getHabit: (id: number) => `/habits/${id}`,
  createHabit: () => '/habits/create',
  updateHabit: (id: number) => `/habits/update/${id}`,
  deleteHabit: (id: number) => `/habits/delete/${id}`,
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
  async getHabit(id: number) {
    try {
      return this.api.get(ENDPOINTS.getHabit(id)).then(res => res.data);
    } catch (error) {
      throw error;
    }
  }
  async createHabit(payload: any) {
    try {
      return this.api
        .post(ENDPOINTS.createHabit(), payload)
        .then(res => res.data);
    } catch (error) {
      throw error;
    }
  }
  async updateHabit(id: number, payload: any) {
    try {
      return this.api
        .put(ENDPOINTS.updateHabit(id), payload)
        .then(res => res.data);
    } catch (error) {
      throw error;
    }
  }
  async deleteHabit(id: number) {
    try {
      return this.api.delete(ENDPOINTS.deleteHabit(id)).then(res => res.data);
    } catch (error) {
      throw error;
    }
  }
}
