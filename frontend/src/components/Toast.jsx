import React, { useEffect } from 'react';

export function Toast({ message, type = 'success', onClose, duration = 3000 }) {
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose]);

  const icons = {
    success: '✓',
    error: '✕',
    info: 'ℹ',
    warning: '⚠'
  };

  const colors = {
    success: 'from-green-600 to-green-500 border-green-400',
    error: 'from-red-600 to-red-500 border-red-400',
    info: 'from-blue-600 to-blue-500 border-blue-400',
    warning: 'from-yellow-600 to-yellow-500 border-yellow-400'
  };

  return (
    <div className={`bg-gradient-to-r ${colors[type]} border-2 rounded-xl px-6 py-4 shadow-2xl flex items-center gap-3 min-w-[280px] max-w-md animate-fadeIn`}>
      <div className="text-white text-xl font-bold flex-shrink-0">{icons[type]}</div>
      <p className="text-white font-semibold text-sm flex-1">{message}</p>
      <button
        onClick={onClose}
        className="text-white/80 hover:text-white transition-all flex-shrink-0 text-lg"
      >
        ✕
      </button>
    </div>
  );
}

export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2 items-center">
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
          duration={toast.duration}
        />
      ))}
    </div>
  );
}

