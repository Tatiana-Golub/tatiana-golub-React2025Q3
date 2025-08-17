'use client';

export const getStorageValue = (key: string, defaultValue: string) => {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  const saved = localStorage.getItem(key);
  return saved || defaultValue;
};
