export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  error: undefined;
}

export interface ApiErrorResponse {
  success: false;
  data: undefined;
  error: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
