import { ReactNode } from 'react';
import { OngoingTaskProvider } from './ongoingTaskContext';
import { ViewProvider } from './viewContext';

/* TODO: add ThemeContext */

function Providers({ children }: { children: ReactNode }) {
  return (
    <ViewProvider>
      <OngoingTaskProvider>{children}</OngoingTaskProvider>
    </ViewProvider>
  );
}

export default Providers;
