import type { FC, ReactNode } from 'react';

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders: FC<AppProvidersProps> = ({ children }) => {
  // In future steps, we'll add:
  // - Redux Provider
  // - Theme Provider
  // - Auth Provider
  // - React Query Provider

  return <>{children}</>;
};
