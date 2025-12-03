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
    success: 'from-green-600 to-green-500 border-green-500/30',
    error: 'from-red-600 to-red-500 border-red-500/30',
    info: 'from-blue-600 to-blue-500 border-blue-500/30',
    warning: 'from-yellow-600 to-yellow-500 border-yellow-500/30'
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] animate-fadeIn flex justify-center">
      <div className={`bg-gradient-to-r ${colors[type]} border rounded-xl px-6 py-4 shadow-2xl backdrop-blur-sm flex items-center gap-3 min-w-[280px] max-w-md`}>
        <div className="text-white text-xl font-bold flex-shrink-0">{icons[type]}</div>
        <p className="text-white font-semibold text-sm flex-1 whitespace-nowrap">{message}</p>
        <button
          onClick={onClose}
          className="text-white/70 hover:text-white transition-all flex-shrink-0"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-2">
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

