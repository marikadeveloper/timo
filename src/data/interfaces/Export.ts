import { Project } from './Project';
import { Task } from './Task';
import { Timer } from './Timer';

type ExportType = 'day' | 'week' | 'month' | 'year' | 'range';
type ExportTasksFilter = {
  exportType: ExportType;
  rangeStart?: Date;
  rangeEnd?: Date;
  codeFilter?: string;
};
type ExportTask = Task & {
  parent?: Task;
  project?: Project;
  timers?: Timer[];
};
export type { ExportTask, ExportTasksFilter, ExportType };
