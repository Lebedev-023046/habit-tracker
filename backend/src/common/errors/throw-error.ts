// src/shared/errors/throw-error.ts
import {
  BadRequestException,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { mapPrismaErrorToHttp } from './prisma-error.mapper';

import { toMessage, withPrefix } from './error-utils';
import { matchFriendlyValidationMessage } from './validation-error.matcher';

interface ThrowErrorProps {
  error: unknown;
  errorMessage: string;
}

export function throwError({ error, errorMessage }: ThrowErrorProps): never {
  // 1) Если уже HttpException — не ломаем статус/сообщение
  if (error instanceof HttpException) {
    throw error;
  }

  // 2) Prisma -> HttpException
  const prismaHttp = mapPrismaErrorToHttp(error, errorMessage);
  if (prismaHttp) throw prismaHttp;

  // 3) regex/валидация -> 400
  const friendly = matchFriendlyValidationMessage(error);
  if (friendly) {
    throw new BadRequestException(withPrefix(errorMessage, friendly));
  }

  // 4) неизвестное -> 500
  throw new InternalServerErrorException(
    withPrefix(errorMessage, toMessage(error) || 'Something went wrong'),
  );
}
