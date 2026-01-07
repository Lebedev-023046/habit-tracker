import axios from 'axios';
import { authEvents } from '../auth/auth-events';
import { refreshAccessToken } from './refresh';
import { tokenStore } from './token.store';

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  withCredentials: true,
});

// =====================
// REQUEST
// =====================
api.interceptors.request.use(config => {
  const token = tokenStore.get();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// =====================
// RESPONSE
// =====================
let isRefreshing = false;
let queue: ((token: string) => void)[] = [];

api.interceptors.response.use(
  response => response,
  async error => {
    const original = error.config;

    if (error.response?.status !== 401 || original._retry) {
      throw error;
    }

    original._retry = true;

    if (isRefreshing) {
      return new Promise(resolve => {
        queue.push(token => {
          original.headers.Authorization = `Bearer ${token}`;
          resolve(api(original));
        });
      });
    }

    isRefreshing = true;

    try {
      const { accessToken } = await refreshAccessToken();

      tokenStore.set(accessToken);

      queue.forEach(cb => cb(accessToken));
      queue = [];

      original.headers.Authorization = `Bearer ${accessToken}`;
      return api(original);
    } catch {
      tokenStore.clear();
      authEvents.emitUnauthorized();
      throw error;
    } finally {
      isRefreshing = false;
    }
  },
);
