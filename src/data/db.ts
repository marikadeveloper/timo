import Dexie, { type EntityTable } from 'dexie';
import { Project, ProjectCreateInput } from './interfaces/Project';
import { Task, TaskCreateInput } from './interfaces/Task';
import { Timer, TimerCreateInput } from './interfaces/Timer';

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
  timers: EntityTable<Timer, 'id', TimerCreateInput>;
};

db.version(2).stores({
  projects: '++id, code, name, color',
  tasks: '++id, code, createdAt, description, parentId, projectId',
  timers: '++id, start, end, taskId',
});

db.version(1).stores({
  tasks: '++id, code, createdAt, description, timers, parentId, projectId',
  projects: '++id, code, name, color',
});

export default db;
