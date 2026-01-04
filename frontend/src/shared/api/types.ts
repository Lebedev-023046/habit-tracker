export interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: ApiMeta;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: any;
  };
  meta?: ApiMeta;
}

export type ApiResult<T> = ApiResponse<T> | ApiErrorResponse;

export interface ApiMeta {
  timestamp: string;
}
