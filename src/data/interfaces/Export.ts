import { Project } from './Project';
import { Task } from './Task';
import { Timer } from './Timer';

type ExportType = 'day' | 'week' | 'month' | 'year' | 'range';
type ExportTasksFilter = {
  exportType: ExportType;
  codeFilter?: string;
  rangeStart?: Date;
  rangeEnd?: Date;
  tasks?: Task[];
};
type ExportTask = Task & {
  parent?: Task;
  project?: Project;
  timers?: Timer[];
};
export type { ExportTask, ExportTasksFilter, ExportType };
