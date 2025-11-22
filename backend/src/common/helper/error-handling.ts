interface getErrorMessageProps {
  error: any;
  errorMessage: string;
}

export function throwError({ error, errorMessage }: getErrorMessageProps) {
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
    errorMap[error.code] || error.message || 'Something went wrong';
  throw new Error(`${errorMessage} ${validatedErrorMessage}`);
}
