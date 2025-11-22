export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: any;
  };
  // meta?: {
  //   timestamp: string;
  //   path?: string;
  //   [key: string]: any;
  // };
}

// export interface PaginatedApiResponse<T = any> extends ApiResponse<T[]> {
//   meta: {
//     timestamp: string;
//     page: number;
//     limit: number;
//     total: number;
//     totalPages: number;
//     hasNext: boolean;
//     hasPrev: boolean;
//   };
// }
