import Dexie, { type EntityTable } from 'dexie';
import { Project } from './interfaces/Project';
import { Task } from './interfaces/Task';

const db = new Dexie('TasksDatabase') as Dexie & {
  tasks: EntityTable<
    Task,
    'id' // primary key "id" (for the typings only)
  >;
  projects: EntityTable<
    Project,
    'id' // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  tasks: '++id, description, timers, projectId, createdAt, parentId',
  projects: '++id, code, name, color',
});

export default db;
