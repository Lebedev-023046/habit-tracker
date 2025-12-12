// src/shared/errors/prisma-error.mapper.ts
import {
  BadRequestException,
  ConflictException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { withPrefix } from './error-utils';
import { matchFriendlyValidationMessage } from './validation-error.matcher';

export function mapPrismaErrorToHttp(
  error: unknown,
  errorMessagePrefix: string,
): HttpException | undefined {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return new ConflictException(
          withPrefix(errorMessagePrefix, 'This record already exists'),
        );
      case 'P2025':
        return new NotFoundException(
          withPrefix(errorMessagePrefix, 'The requested item was not found'),
        );
      case 'P2003':
      case 'P2014':
      case 'P2015':
      case 'P2016':
        return new BadRequestException(
          withPrefix(errorMessagePrefix, 'Invalid data reference'),
        );
      case 'P2021':
        return new InternalServerErrorException(
          withPrefix(errorMessagePrefix, 'Table does not exist'),
        );
      case 'P2022':
        return new InternalServerErrorException(
          withPrefix(errorMessagePrefix, 'Column does not exist'),
        );
      default:
        return new BadRequestException(
          withPrefix(
            errorMessagePrefix,
            `Database request error (${error.code})`,
          ),
        );
    }
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    const friendly = matchFriendlyValidationMessage(error);
    return new BadRequestException(
      withPrefix(errorMessagePrefix, friendly ?? 'Invalid request data'),
    );
  }

  return undefined;
}
