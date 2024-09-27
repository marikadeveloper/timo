import { ReactNode } from 'react';
import { ViewProvider } from './viewContext';

function Providers({ children }: { children: ReactNode }) {
  return <ViewProvider>{children}</ViewProvider>;
}

export default Providers;
