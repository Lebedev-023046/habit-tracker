import { api as AxiosApiInstance } from '@/shared/api/instance';

import { unwrapResponse } from '@/shared/api/unwrapResponse';
import type { AxiosInstance } from 'axios';
import type {
  HabitRun,
  ResetHabitRunPayload,
  StartHabitRunPayload,
} from './types';

const ENDPOINTS = {
  base: (habitId: string) => `/habits/${habitId}/run`,
  start: (habitId: string) => `/habits/${habitId}/run/start`,
  pause: (habitId: string) => `/habits/${habitId}/run/pause`,
  resume: (habitId: string) => `/habits/${habitId}/run/resume`,
  build: (habitId: string) => `/habits/${habitId}/run/build`,
  cancel: (habitId: string) => `/habits/${habitId}/run/cancel`,
  reset: (habitId: string) => `/habits/${habitId}/run/reset`,
};

class HabitRunRepo {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
    this.start = this.start.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.build = this.build.bind(this);
    this.cancel = this.cancel.bind(this);
    this.reset = this.reset.bind(this);
  }

  async start(habitId: string, payload: StartHabitRunPayload) {
    return this.api
      .post(ENDPOINTS.start(habitId), payload)
      .then(res => unwrapResponse<HabitRun>(res.data));
  }

  async pause(habitId: string) {
    return this.api
      .post(ENDPOINTS.pause(habitId))
      .then(res => unwrapResponse<HabitRun>(res.data));
  }

  async resume(habitId: string) {
    return this.api
      .post(ENDPOINTS.resume(habitId))
      .then(res => unwrapResponse<HabitRun>(res.data));
  }

  async build(habitId: string) {
    return this.api
      .post(ENDPOINTS.build(habitId))
      .then(res => unwrapResponse<HabitRun>(res.data));
  }

  async cancel(habitId: string) {
    return this.api
      .post(ENDPOINTS.cancel(habitId))
      .then(res => unwrapResponse<HabitRun>(res.data));
  }

  async reset(habitId: string, payload: ResetHabitRunPayload) {
    return this.api
      .post(ENDPOINTS.reset(habitId), payload)
      .then(res => unwrapResponse<HabitRun>(res.data));
  }
}

export const habitRunRepo = new HabitRunRepo(AxiosApiInstance);
