// shared/api/getApiErrorMessage.ts
import type { AxiosError } from 'axios';

type BackendErrorResponse = {
  success?: false;
  error?: {
    message?: string;
    code?: string;
    details?: unknown;
  };
  message?: string | string[];
};

export function getApiErrorMessage(error: unknown): string {
  // Axios error
  if (isAxiosError(error)) {
    const data = error.response?.data as BackendErrorResponse | undefined;

    // ✅ ТВОЙ ResponseUtil.error
    if (data?.error?.message) {
      return data.error.message;
    }

    // ✅ NestJS validation / exception
    if (typeof data?.message === 'string') {
      return data.message;
    }

    if (Array.isArray(data?.message)) {
      return data.message[0];
    }

    // Axios fallback
    return error.message;
  }

  // JS Error fallback
  if (error instanceof Error) {
    return error.message;
  }

  return 'Unknown error';
}

function isAxiosError(error: unknown): error is AxiosError {
  return typeof error === 'object' && error !== null && 'isAxiosError' in error;
}
