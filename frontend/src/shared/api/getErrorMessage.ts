import type { AxiosError } from 'axios';
import type { ApiErrorResponse, ApiResponse } from './types';

export function getApiErrorMessage(error: unknown): string | null {
  const axiosError = error as AxiosError<ApiResponse<ApiErrorResponse>>;

  return (
    axiosError?.response?.data?.error?.message ??
    (error as Error)?.message ??
    null
  );
}
