// 'use client';

export const getStorageValue = (key: string, defaultValue: string) => {
  // const saved = localStorage.getItem(key);
  const saved = defaultValue;
  return saved || defaultValue;
};
