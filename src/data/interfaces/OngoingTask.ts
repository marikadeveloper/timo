import { Task } from './Task';

type OngoingTaskContextType = {
  ongoingTask: Task | null;
  setOngoingTask: (task: Task | null) => void;
};

export type { OngoingTaskContextType };
