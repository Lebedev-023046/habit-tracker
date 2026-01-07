import { refreshClient } from './refresh.client';
import { unwrapResponse } from './unwrapResponse';

export async function refreshAccessToken(): Promise<{ accessToken: string }> {
  const accessToken = await refreshClient
    .post('/auth/refresh')
    .then(res => unwrapResponse<{ accessToken: string }>(res.data));

  if (!accessToken) {
    throw new Error('Refresh failed');
  }

  return accessToken;
}
