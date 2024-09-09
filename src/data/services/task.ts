import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db';
import { TaskCreateInput, TaskUpdateInput } from '../interfaces/Task';

const getAllTasks = async () => {
  return db.tasks.toArray();
};

const getTasksByDate = async ({ date }: { date: Date }) => {
  return useLiveQuery(() => db.tasks.where('createdAt').equals(date).toArray());
};

const getTasksByProject = async ({ projectId }: { projectId: number }) => {
  return db.tasks.where('projectId').equals(projectId).toArray();
};

const getTaskById = async ({ taskId }: { taskId: number }) => {
  return db.tasks.get(taskId);
};

const createTask = async ({ description, projectId }: TaskCreateInput) => {
  if (!description?.trim()) {
    throw new Error('Description is required');
  }
  return db.tasks.add({
    description,
    projectId,
    createdAt: new Date(),
    timers: [{ start: new Date(), end: undefined }],
  });
};

const updateTask = async ({ id, description, projectId }: TaskUpdateInput) => {
  if (!description?.trim()) {
    throw new Error('Description is required');
  }
  return db.tasks.update(id, { description, projectId });
};

const deleteTask = async ({ id }: { id: number }) => {
  return db.tasks.delete(id);
};

export {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  getTasksByDate,
  getTasksByProject,
  updateTask,
};
