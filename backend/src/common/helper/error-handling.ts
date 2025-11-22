interface getErrorMessageProps {
  error: unknown;
  errorMessage: string;
}

export function throwError({ error, errorMessage }: getErrorMessageProps) {
  const validatedErrorMessage =
    error instanceof Error ? error.message : JSON.stringify(error);
  throw new Error(`${errorMessage}: ${validatedErrorMessage}`);
}
