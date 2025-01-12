import { useState, useCallback } from 'react';

export const useConfirm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState({
    title: '',
    message: '',
    confirmLabel: 'Confirm',
    cancelLabel: 'Cancel',
    onConfirm: () => {},
    onCancel: () => {},
    severity: 'warning',
  });

  const confirm = useCallback(
    (options) => {
      return new Promise((resolve) => {
        setConfig({
          ...config,
          ...options,
          onConfirm: () => {
            options.onConfirm?.();
            resolve(true);
            setIsOpen(false);
          },
          onCancel: () => {
            options.onCancel?.();
            resolve(false);
            setIsOpen(false);
          },
        });
        setIsOpen(true);
      });
    },
    [config]
  );

  return {
    isOpen,
    config,
    confirm,
    closeConfirm: () => setIsOpen(false),
  };
}; 