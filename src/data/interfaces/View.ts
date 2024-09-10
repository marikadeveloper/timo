type AppView = 'tasks' | 'projects' | 'exports';

interface ViewContextType {
  view: AppView;
  setView: (view: AppView) => void;
}

export type { AppView, ViewContextType };
