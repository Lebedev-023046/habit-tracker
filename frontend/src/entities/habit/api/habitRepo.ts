import type { AxiosInstance } from 'axios';
import type {
  CreateHabitPayload,
  DeleteHabitPayload,
  UpdateHabitPayload,
  UpdateHabitStatusAndPositionPayload,
  UpdateHabitStatusPayload,
} from './types';

const ENDPOINTS = {
  getAllHabits: () => `/habits`,
  getHabit: (id: string) => `/habits/${id}`,
  createHabit: () => '/habits/create',
  updateHabit: (id: string) => `/habits/update/${id}`,
  updateHabitStatusAndPosition: (id: string) =>
    `/habits/update-status-and-position/${id}`,
  updateHabitStatus: (id: string) => `habits/update-status/${id}`,
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
    this.updateHabitStatusAndPosition =
      this.updateHabitStatusAndPosition.bind(this);
    this.updateHabitStatus = this.updateHabitStatus.bind(this);
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

  async updateHabitStatus(payload: UpdateHabitStatusPayload) {
    try {
      const { id, status } = payload;
      return this.api
        .patch(ENDPOINTS.updateHabitStatus(id), { status })
        .then(res => res.data);
    } catch (error) {
      throw error;
    }
  }

  async updateHabitStatusAndPosition(
    payload: UpdateHabitStatusAndPositionPayload,
  ) {
    try {
      const { id } = payload;
      return this.api
        .patch(ENDPOINTS.updateHabitStatusAndPosition(id), { payload })
        .then(res => res.data);
    } catch (error) {
      throw error;
    }
  }

  async deleteHabit(payload: DeleteHabitPayload) {
    try {
      const { id } = payload;
      return this.api.delete(ENDPOINTS.deleteHabit(id)).then(res => res.data);
    } catch (error) {
      throw error;
    }
  }
}
