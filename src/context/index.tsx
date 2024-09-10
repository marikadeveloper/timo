import { ReactNode } from 'react';
import { ViewProvider } from './view-context';

/* TODO: add ThemeContext */

function Providers({ children }: { children: ReactNode }) {
  return <ViewProvider>{children}</ViewProvider>;
}

export default Providers;
