'use client';

import { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useToast } from '@/lib/hooks/use-toast';

export function Toast() {
  const { toasts, dismiss } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            flex items-start gap-3 p-4 pr-8 rounded-lg shadow-lg min-w-[300px] max-w-md
            transform transition-all duration-300 animate-slide-in-bottom
            ${
              toast.variant === 'destructive'
                ? 'bg-red-50 border border-red-200'
                : toast.variant === 'success'
                ? 'bg-green-50 border border-green-200'
                : 'bg-white border border-gray-200'
            }
          `}
        >
          {/* Icon */}
          <div className="flex-shrink-0">
            {toast.variant === 'destructive' ? (
              <AlertCircle className="h-5 w-5 text-red-600" />
            ) : toast.variant === 'success' ? (
              <CheckCircle className="h-5 w-5 text-green-600" />
            ) : (
              <Info className="h-5 w-5 text-blue-600" />
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div
              className={`font-medium ${
                toast.variant === 'destructive'
                  ? 'text-red-900'
                  : toast.variant === 'success'
                  ? 'text-green-900'
                  : 'text-gray-900'
              }`}
            >
              {toast.title}
            </div>
            {toast.description && (
              <div
                className={`mt-1 text-sm ${
                  toast.variant === 'destructive'
                    ? 'text-red-700'
                    : toast.variant === 'success'
                    ? 'text-green-700'
                    : 'text-gray-600'
                }`}
              >
                {toast.description}
              </div>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={() => dismiss(toast.id)}
            className="absolute top-4 right-2 p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      ))}
    </div>
  );
}