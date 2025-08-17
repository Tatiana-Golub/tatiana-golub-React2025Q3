import type { ReactNode } from 'react';

export interface Props {
  children: ReactNode;
  errorText: string;
}

export interface State {
  hasError: boolean;
}
