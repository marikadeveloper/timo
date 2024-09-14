import React, { createContext, useContext, useMemo, useState } from 'react';
import { OngoingTaskContextType } from '../data/interfaces/OngoingTask';

const defaultValue: OngoingTaskContextType = {
  ongoingTask: null,
  setOngoingTask: () => {},
};

const OngoingTaskContext = createContext<OngoingTaskContextType>(defaultValue);

type OngoingTaskProviderProps = {
  children: React.ReactNode;
};

const OngoingTaskProvider: React.FC<OngoingTaskProviderProps> = ({
  children,
}) => {
  const [ongoingTask, setOngoingTask] =
    useState<OngoingTaskContextType['ongoingTask']>(null);

  const value = useMemo(() => ({ ongoingTask, setOngoingTask }), [ongoingTask]);

  return (
    <OngoingTaskContext.Provider value={value}>
      {children}
    </OngoingTaskContext.Provider>
  );
};

function useOngoingTask() {
  const context = useContext(OngoingTaskContext);
  if (context === undefined) {
    throw new Error('useOngoingTask must be used within a OngoingTaskProvider');
  }
  return context;
}

export { OngoingTaskProvider, useOngoingTask };
