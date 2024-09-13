import { useLiveQuery } from 'dexie-react-hooks';
import db from '../db';
import { TaskCreateInput, TaskUpdateInput } from '../interfaces/Task';
import { startTimer } from './timerService';

const getAllTasks = async () => {
  return db.tasks.toArray();
};

const getTasksByDate = async (date: Date) => {
  return useLiveQuery(() => db.tasks.where('createdAt').equals(date).toArray());
};

const getTasksByProject = async (projectId: number) => {
  return db.tasks.where('projectId').equals(projectId).toArray();
};

const getTaskById = async (taskId: number) => {
  return db.tasks.get(taskId);
};

const createTask = async ({ description, projectId }: TaskCreateInput) => {
  try {
    if (!description?.trim()) {
      throw new Error('Description is required');
    }

    const taskId = await db.tasks.add({
      description,
      projectId,
      code: '', // Temporary code
      createdAt: new Date(),
    });

    if (!taskId) {
      throw new Error('Failed to create task');
    }

    // create timer
    await startTimer({ taskId });

    // create task code
    let taskCode = taskId.toString();
    if (projectId) {
      const project = await db.projects.get(projectId);
      if (project) {
        taskCode = `${project.code}-${taskId}`;
      }
    }
    await db.tasks.update(taskId, { code: taskCode });

    return taskId;
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Failed to create task');
  }
};

const updateTask = async ({ id, description, projectId }: TaskUpdateInput) => {
  if (!description?.trim()) {
    throw new Error('Description is required');
  }
  return db.tasks.update(id, { description, projectId });
};

const deleteTask = async (id: number) => {
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
