import {
  BadRequestException,
  ConflictException,
  HttpException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

interface GetErrorMessageProps {
  error: unknown;
  errorMessage: string;
}

type ErrorPattern = {
  pattern: RegExp;
  handler: (match: RegExpMatchArray) => string;
};

const PATTERNS = [
  {
    pattern: /Argument \`(\w+)\` is missing/,
    handler: (match: RegExpMatchArray) => `The ${match[1]} field is required`,
  },
  {
    pattern: /Invalid value for argument \`(\w+)/,
    handler: (match: RegExpMatchArray) =>
      `Invalid format for ${match[1]}. Please use a valid format.`,
  },
  {
    pattern: /Argument \`(\w+)\`: Invalid value/,
    handler: (match: RegExpMatchArray) => `Invalid type for field: ${match[1]}`,
  },
  {
    pattern: /input contains invalid characters/,
    handler: () => 'Invalid data format provided',
  },
  {
    pattern: /Unknown argument/,
    handler: (match: RegExpMatchArray) => 'Unknown field provided in request',
  },
];

function toMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;
  try {
    return JSON.stringify(error);
  } catch {
    return 'Unknown error';
  }
}

function matchFriendlyMessage(error: unknown): string | undefined {
  const msg = toMessage(error);
  for (const { pattern, handler } of PATTERNS) {
    const match = msg.match(pattern);
    if (match) return handler(match);
  }
  return undefined;
}

function mapPrismaToHttp(
  error: unknown,
  prefix: string,
): HttpException | undefined {
  // Prisma Client Known Request Error (P20xx)
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return new ConflictException(`${prefix} This record already exists`);
      case 'P2025':
        return new NotFoundException(
          `${prefix} The requested item was not found`,
        );
      case 'P2003':
      case 'P2014':
      case 'P2015':
      case 'P2016':
        return new BadRequestException(`${prefix} Invalid data reference`);
      case 'P2021':
        return new InternalServerErrorException(
          `${prefix} Table does not exist`,
        );
      case 'P2022':
        return new InternalServerErrorException(
          `${prefix} Column does not exist`,
        );
      default:
        return new BadRequestException(
          `${prefix} Database request error (${error.code})`,
        );
    }
  }

  // Prisma validation errors
  if (error instanceof Prisma.PrismaClientValidationError) {
    const friendly = matchFriendlyMessage(error);
    return new BadRequestException(
      `${prefix} ${friendly ?? 'Invalid request data'}`,
    );
  }

  return undefined;
}

export function throwError({
  error,
  errorMessage,
}: GetErrorMessageProps): never {
  // 1) Если это уже HTTP-исключение — не ломаем семантику
  if (error instanceof HttpException) {
    throw error;
  }

  const prefix = errorMessage.trim().endsWith(':')
    ? errorMessage.trim()
    : `${errorMessage.trim()}:`;

  // 2) Prisma -> HTTP
  const prismaHttp = mapPrismaToHttp(error, prefix);
  if (prismaHttp) throw prismaHttp;

  // 3) Наши/прочие ошибки валидации -> 400
  const friendly = matchFriendlyMessage(error);
  if (friendly) {
    throw new BadRequestException(`${prefix} ${friendly}`);
  }

  // 4) Если пришёл обычный Error — решаем: 400 или 500?
  // В большинстве случаев лучше 500, чтобы не маскировать баги.
  const msg = toMessage(error);
  throw new InternalServerErrorException(
    `${prefix} ${msg || 'Something went wrong'}`,
  );
}
