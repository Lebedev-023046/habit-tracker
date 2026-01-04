import { api as AxiosApiInstance } from '@/shared/api/instance';
import { unwrapResponse } from '@/shared/api/unwrapResponse';
import { getClientTimezone } from '@/shared/lib/timezone';
import type { AxiosInstance } from 'axios';
import type { LoginPayload, RegisterPayload } from './types';

const ENDPOINTS = {
  register: '/auth/register',
  login: '/auth/login',
  logout: '/auth/logout',
};

class AuthRepo {
  private api: AxiosInstance;
  constructor(api: AxiosInstance) {
    this.api = api;
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async register(payload: RegisterPayload): Promise<{ accessToken: string }> {
    return this.api.post(ENDPOINTS.register, {
      ...payload,
      timezone: getClientTimezone(),
    });
  }

  async login(payload: LoginPayload): Promise<{ accessToken: string }> {
    return this.api
      .post(ENDPOINTS.login, payload)
      .then(res => unwrapResponse(res.data));
  }

  async logout() {
    return this.api.post(ENDPOINTS.logout);
  }
}

export const authRepo = new AuthRepo(AxiosApiInstance);
