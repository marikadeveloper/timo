import { Project } from './Project';
import { Timer } from './Timer';

enum TaskStatus {
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}
interface Task {
  id: number;
  code: string;
  createdAt: string; // Date
  description: string;
  parentId?: number;
  projectId?: number;
  status: TaskStatus;
  lastEndedAt?: string; // Date
}
interface TaskExtended extends Task {
  timers: Timer[];
  project?: Project;
}
interface TaskCreateInput {
  code?: string;
  createdAt?: string;
  description: string;
  parentId?: number;
  projectId?: number; // TODO: if parent present, projectId is taken from the parent
  status?: TaskStatus;
  lastEndedAt?: string;
}
interface TaskUpdateInput {
  id: number;
  description?: string;
  parentId?: number;
  projectId?: number;
}
export { TaskStatus };
export type { Task, TaskCreateInput, TaskExtended, TaskUpdateInput };
/* 
note for who is reading this: I'm not sure if this is the best way to do the "timers" field,
but it works for me at the moment.
Being used to relational databases, I would have a table for tasks and a table for timers,
with a foreign key in the timers table to the tasks table.
I am doing this at the moment considering that the user will have more timers than tasks
and that the timers are not being shared between tasks.
This approach might have quickest reads
 */
