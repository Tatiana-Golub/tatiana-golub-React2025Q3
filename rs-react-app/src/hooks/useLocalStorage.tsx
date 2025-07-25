import { useState, useEffect } from 'react';

export function useLocalStorage(
  key: string,
  defaultValue: string
): [string, (value: string) => void] {
  const getStorageValue = () => {
    const saved = localStorage.getItem(key);
    return saved || defaultValue;
  };

  const [value, setValue] = useState(getStorageValue);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
