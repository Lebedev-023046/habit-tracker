import { refreshClient } from './refresh.client';

export async function refreshAccessToken(): Promise<string> {
  const { data } = await refreshClient.post('/auth/refresh');

  if (!data?.accessToken) {
    throw new Error('Refresh failed');
  }

  return data.accessToken;
}
