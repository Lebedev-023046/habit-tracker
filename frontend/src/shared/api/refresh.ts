// shared/api/refresh.ts
import { api } from './instance';
import { tokenStore } from './token.store';

export async function refreshAccessToken(): Promise<string> {
  const { data } = await api.post('/auth/refresh');
  tokenStore.set(data.accessToken);
  return data.accessToken;
}
