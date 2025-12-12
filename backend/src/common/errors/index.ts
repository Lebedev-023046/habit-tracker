// src/shared/errors/index.ts
export { toMessage } from './error-utils';
export { mapPrismaErrorToHttp } from './prisma-error.mapper';
export { throwError } from './throw-error';
export { matchFriendlyValidationMessage } from './validation-error.matcher';
