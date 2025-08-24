import { useState } from 'react';

export function useModal() {
  const [isShowing, setIsShowing] = useState(false);

  function open() {
    setIsShowing(true);
  }

  function close() {
    setIsShowing(false);
  }

  return { isShowing, open, close };
}
