export function toMessage(error: unknown): string {
  if (typeof error === 'string') return error;
  if (error instanceof Error) return error.message;

  try {
    return JSON.stringify(error);
  } catch {
    return 'Unknown error';
  }
}

export function withPrefix(prefix: string, msg: string): string {
  const p = prefix.trim().endsWith(':') ? prefix.trim() : `${prefix.trim()}:`;
  return `${p} ${msg}`.trim();
}
