interface getErrorMessageProps {
  error: any;
  errorMessage: string;
}

const getMissingFieldError = (error: any) => {
  const missingFieldMatch = error.message.match(
    /Argument \`(\w+)\` is missing/,
  );
  if (missingFieldMatch) {
    const fieldName = missingFieldMatch[1];
    return `The ${fieldName} field is required`;
  }
};

const getInvalidTypeErrpr = (error: any) => {
  const errorMessage = error?.message ?? error;
  const patterns = [
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
      handler: (match: RegExpMatchArray) =>
        `Invalid type for field: ${match[1]}`,
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

  // Проверяем все паттерны
  for (const { pattern, handler } of patterns) {
    const match = errorMessage.match(pattern);
    if (match) {
      return handler(match);
    }
  }
};

export function throwError({ error, errorMessage }: getErrorMessageProps) {
  const missingFieldErrorMessage = getMissingFieldError(error);
  const invalidTypeErrorMessage = getInvalidTypeErrpr(error);

  console.log({ invalidTypeErrorMessage });

  const errorMap: Record<string, string> = {
    P2002: 'This record already exists',
    P2025: 'The requested item was not found',
    P2003: 'Invalid data reference',
    P2014: 'Data relationship conflict',
    P2015: 'Related record not found',
    P2016: 'Query interpretation error',
    P2021: 'Table does not exist',
    P2022: 'Column does not exist',
  };

  const validatedErrorMessage =
    errorMap[error.code] ||
    missingFieldErrorMessage ||
    invalidTypeErrorMessage ||
    error.message ||
    'Something went wrong';
  throw new Error(`${errorMessage} ${validatedErrorMessage}`);
}
