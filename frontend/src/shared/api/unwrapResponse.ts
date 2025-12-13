export function unwrapResponse<T>(res: {
  success: boolean;
  data?: T;
  error?: string;
}): T {
  if (!res.success) {
    throw new Error(res.error || 'Unknown API error');
  }
  return res.data as T;
}
