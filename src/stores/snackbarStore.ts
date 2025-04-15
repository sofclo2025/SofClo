import { create } from 'zustand';

export interface SnackbarMessage {
  message: string;
  variant: 'success' | 'error' | 'warning' | 'info';
  key: number;
}

interface SnackbarState {
  messages: SnackbarMessage[];
  enqueueSnackbar: (message: string, options?: { variant?: SnackbarMessage['variant'] }) => void;
  removeSnackbar: (key: number) => void;
}

export const useSnackbarStore = create<SnackbarState>((set) => ({
  messages: [],
  enqueueSnackbar: (message, options = {}) =>
    set((state) => ({
      messages: [
        ...state.messages,
        {
          message,
          variant: options.variant || 'info',
          key: new Date().getTime(),
        },
      ],
    })),
  removeSnackbar: (key) =>
    set((state) => ({
      messages: state.messages.filter((message) => message.key !== key),
    })),
}));
