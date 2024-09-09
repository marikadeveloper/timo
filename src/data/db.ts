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

// Schema declaration:
db.version(1).stores({
  tasks: '++id, code, createdAt, description, timers, parentId, projectId',
  projects: '++id, code, name, color',
});

export default db;
