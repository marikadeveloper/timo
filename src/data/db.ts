import Dexie, { type EntityTable } from 'dexie';
import { Project, ProjectCreateInput } from './interfaces/Project';
import { Task, TaskCreateInput } from './interfaces/Task';

const db = new Dexie('TasksDatabase') as Dexie & {
  tasks: EntityTable<
    Task,
    'id', // primary key "id" (for the typings only)
    TaskCreateInput
  >;
  projects: EntityTable<
    Project,
    'id', // primary key "id" (for the typings only)
    ProjectCreateInput
  >;
};

/**
 * TODO: add a code to the task?
 * - The code could be auto generated, like PROJECT_CODE-TASK_INDEX
 * - What if no project? Maybe just the task ID?
 *
 * TODO: auto generate the project code?
 * - The code could be auto generated, like the first 3 or 4 letters of the project name uppercase
 */
// Schema declaration:
db.version(1).stores({
  tasks: '++id, code, createdAt, description, timers, parentId, projectId',
  projects: '++id, code, name, color',
});

export default db;
