import { Project } from './Project';
import { Task } from './Task';
import { Timer } from './Timer';

type ExportTasksFilter = {
  codeFilter?: string;
  dateRange: null | [Date, Date];
  tasks?: Task[];
};
type ExportTask = Task & {
  parent?: Task;
  project?: Project;
  timers?: Timer[];
};
export type { ExportTask, ExportTasksFilter };
