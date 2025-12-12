// src/shared/errors/validation-error.matcher.ts
import { toMessage } from './error-utils';

type ErrorPattern = {
  pattern: RegExp;
  handler: (match: RegExpMatchArray) => string;
};

const PATTERNS: ErrorPattern[] = [
  {
    pattern: /Argument `(\w+)` is missing/,
    handler: (m) => `The ${m[1]} field is required`,
  },
  {
    pattern: /Invalid value for argument `(\w+)/,
    handler: (m) => `Invalid format for ${m[1]}. Please use a valid format.`,
  },
  {
    pattern: /Argument `(\w+)`: Invalid value/,
    handler: (m) => `Invalid type for field: ${m[1]}`,
  },
  {
    pattern: /input contains invalid characters/i,
    handler: () => 'Invalid data format provided',
  },
  {
    pattern: /Unknown argument/i,
    handler: () => 'Unknown field provided in request',
  },
];

export function matchFriendlyValidationMessage(
  error: unknown,
): string | undefined {
  const msg = toMessage(error);

  for (const { pattern, handler } of PATTERNS) {
    const match = msg.match(pattern);
    if (match) return handler(match);
  }

  return undefined;
}
