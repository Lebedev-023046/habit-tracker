type Listener = () => void;

let listeners: Listener[] = [];

export const authEvents = {
  onUnauthorized(listener: Listener) {
    listeners.push(listener);

    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },

  emitUnauthorized() {
    listeners.forEach(l => l());
  },
};
