// shared/lib/usePageTitle.ts
import { useMatches } from 'react-router-dom';

export function usePageTitle(defaultTitle = 'Habit Tracker') {
  const matches = useMatches();

  // последний матч — самый «глубокий» маршрут
  const lastMatch = matches[matches.length - 1];

  const handle = lastMatch?.handle as
    | { title?: string; getTitle?: (params: Record<string, string>) => string }
    | undefined;

  if (!handle) return defaultTitle;

  if (handle.getTitle) {
    return handle.getTitle(lastMatch.params as Record<string, string>);
  }

  if (handle.title) {
    return handle.title;
  }

  return defaultTitle;
}
