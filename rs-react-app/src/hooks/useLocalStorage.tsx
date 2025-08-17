'use client';

import { useState, useEffect } from 'react';
import { getStorageValue } from './helpers';

export function useLocalStorage(
  key: string,
  defaultValue: string
): [string, (value: string) => void] {
  const [value, setValue] = useState(getStorageValue(key, defaultValue));

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
