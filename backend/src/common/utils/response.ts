// src/common/utils/response.util.ts
import { ApiResponse } from '../interfaces/api-responce';

export class ResponseUtil {
  static success<T>(data: T, meta?: any): ApiResponse<T> {
    return {
      success: true,
      data,
      // meta: {
      //   timestamp: new Date().toISOString(),
      //   ...meta
      // }
    };
  }

  static error(message: string, code?: string, details?: any): ApiResponse {
    return {
      success: false,
      error: {
        message,
        code,
        details,
      },
      // meta: {
      //   timestamp: new Date().toISOString()
      // }
    };
  }

  // static paginated<T>(
  //   data: T[],
  //   page: number,
  //   limit: number,
  //   total: number
  // ): PaginatedApiResponse<T> {
  //   const totalPages = Math.ceil(total / limit);

  //   return {
  //     success: true,
  //     data,
  //     meta: {
  //       timestamp: new Date().toISOString(),
  //       page,
  //       limit,
  //       total,
  //       totalPages,
  //       hasNext: page < totalPages,
  //       hasPrev: page > 1
  //     }
  //   };
  // }
}
