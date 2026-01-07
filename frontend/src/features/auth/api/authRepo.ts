import { api as AxiosApiInstance } from '@/shared/api/instance';
import { unwrapResponse } from '@/shared/api/unwrapResponse';
import { getClientTimezone } from '@/shared/lib/timezone';
import type { AxiosInstance } from 'axios';
import type { GoogleAuthPayload, LoginPayload, RegisterPayload } from './types';

const ENDPOINTS = {
  google: '/auth/google',
  register: '/auth/register',
  login: '/auth/login',
  logout: '/auth/logout',
};

class AuthRepo {
  private api: AxiosInstance;
  constructor(api: AxiosInstance) {
    this.api = api;

    this.googleAuth = this.googleAuth.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  async googleAuth(
    payload: GoogleAuthPayload,
  ): Promise<{ accessToken: string }> {
    return this.api
      .post(ENDPOINTS.google, { ...payload, timezone: getClientTimezone() })
      .then(res => unwrapResponse(res.data));
  }

  async register(payload: RegisterPayload): Promise<{ accessToken: string }> {
    return this.api
      .post(ENDPOINTS.register, {
        ...payload,
        timezone: getClientTimezone(),
      })
      .then(res => unwrapResponse(res.data));
  }

  async login(payload: LoginPayload): Promise<{ accessToken: string }> {
    return this.api
      .post(ENDPOINTS.login, payload)
      .then(res => unwrapResponse(res.data));
  }

  async logout() {
    return this.api
      .post(ENDPOINTS.logout)
      .then(res => unwrapResponse(res.data));
  }
}

export const authRepo = new AuthRepo(AxiosApiInstance);
