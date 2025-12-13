type SonnerModule = typeof import('sonner');

let sonnerPromise: Promise<SonnerModule> | null = null;

function loadSonner() {
  if (!sonnerPromise) {
    sonnerPromise = import('sonner'); // отдельный chunk
  }
  return sonnerPromise;
}

// Fire-and-forget, чтобы не писать await в коде
export const toast = {
  message: (msg: string) => loadSonner().then(m => m.toast.message(msg)),
  success: (msg: string) => loadSonner().then(m => m.toast.success(msg)),
  error: (msg: string) => loadSonner().then(m => m.toast.error(msg)),
  warning: (msg: string) => loadSonner().then(m => m.toast.warning(msg)),
};

// опционально: прогреть чанк заранее (например, при первой загрузке dashboard/board)
export function preloadToasts() {
  loadSonner();
}
