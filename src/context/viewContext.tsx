import React, { createContext, useContext, useMemo, useState } from 'react';
import { AppView, ViewContextType } from '../data/interfaces/View';

// Define the default view context
const defaultValue: ViewContextType = {
  view: 'tasks',
  setView: () => {},
};

// Create the view context
const ViewContext = createContext<ViewContextType>(defaultValue);

type ViewProviderProps = {
  children: React.ReactNode;
};

// Create the view provider component
const ViewProvider: React.FC<ViewProviderProps> = ({ children }) => {
  const [view, setView] = useState<AppView>('tasks'); // Set the initial view state

  // Memoize the view context value
  const viewContextValue = useMemo(
    () => ({
      view,
      setView,
    }),
    [view],
  );

  // Render the view provider with the view context value
  return (
    <ViewContext.Provider value={viewContextValue}>
      {children}
    </ViewContext.Provider>
  );
};

function useViewContext() {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error(`useViewContext must be used within a ViewProvider`);
  }
  return context;
}

export { useViewContext, ViewProvider };
