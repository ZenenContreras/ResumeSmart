import { useState, useEffect } from 'react';

export type ToastVariant = 'default' | 'destructive' | 'success';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
}

interface ToastState {
  toasts: Toast[];
}

const toastState: ToastState = {
  toasts: [],
};

let listeners: Array<(state: ToastState) => void> = [];

function emitChange() {
  for (let listener of listeners) {
    listener(toastState);
  }
}

export function toast({
  title,
  description,
  variant = 'default',
}: {
  title: string;
  description?: string;
  variant?: ToastVariant;
}) {
  const id = Date.now().toString();
  const newToast: Toast = { id, title, description, variant };

  toastState.toasts = [...toastState.toasts, newToast];
  emitChange();

  // Auto-dismiss after 5 seconds
  setTimeout(() => {
    toastState.toasts = toastState.toasts.filter(t => t.id !== id);
    emitChange();
  }, 5000);
}

export function useToast() {
  const [state, setState] = useState<ToastState>(toastState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      listeners = listeners.filter(l => l !== setState);
    };
  }, []);

  return {
    toasts: state.toasts,
    toast,
    dismiss: (id: string) => {
      toastState.toasts = toastState.toasts.filter(t => t.id !== id);
      emitChange();
    },
  };
}