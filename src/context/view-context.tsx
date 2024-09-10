import React, { createContext, useContext, useMemo, useState } from 'react';
import { AppView, ViewContextType } from '../data/interfaces/View';

// Define the default view context
const defaultViewContext: ViewContextType = {
  view: 'tasks',
  setView: () => {},
};

// Create the view context
const ViewContext = createContext<ViewContextType>(defaultViewContext);

// Create the view provider component
function ViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<AppView>('tasks'); // Set the initial view state

  // Define the function to update the view state
  const updateView = (newView: AppView) => {
    setView(newView);
  };

  // Memoize the view context value
  const viewContextValue = useMemo(
    () => ({
      view,
      setView: updateView,
    }),
    [view],
  );

  // Render the view provider with the view context value
  return (
    <ViewContext.Provider value={viewContextValue}>
      {children}
    </ViewContext.Provider>
  );
}

function useViewContext() {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error(`useViewContext must be used within a ViewProvider`);
  }
  return context;
}

export { useViewContext, ViewProvider };
