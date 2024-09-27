import dayjs from 'dayjs';
import { attachInfoToTasks } from '../../utils/exportUtils';
import db from '../db';
import {
  Task,
  TaskCreateInput,
  TaskExtended,
  TaskUpdateInput,
} from '../interfaces/Task';
import { startTimer } from './timerService';

const getAllTasks = async () => {
  return db.tasks.toArray();
};

const getTasksByDate = async (date: dayjs.Dayjs) => {
  // TODO: how to handle tasks that span multiple days?
  const tasks = await db.tasks
    .where('createdAt')
    .equals(date.format('YYYY-MM-DD'))
    .toArray();

  // attach project, parent, and timers to each task
  await attachInfoToTasks(tasks);

  return tasks as TaskExtended[];
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

    const newTask = await addTaskToDb({ description, projectId });
    await startTimer(newTask.id!);
    newTask.code = await generateTaskCode(newTask.id!, projectId);

    await db.tasks.update(newTask.id!, { code: newTask.code });

    return newTask as Task;
  } catch (error) {
    console.error('Error creating task:', error);
    throw new Error('Failed to create task');
  }
};

const addTaskToDb = async ({ description, projectId }: TaskCreateInput) => {
  const newTask: TaskCreateInput & { id?: number } = {
    description,
    projectId,
    code: '', // Temporary code
    createdAt: dayjs().format('YYYY-MM-DD'),
  };

  const taskId = await db.tasks.add(newTask);

  if (!taskId) {
    throw new Error('Failed to create task');
  }
  newTask.id = taskId;

  return newTask;
};

const generateTaskCode = async (taskId: number, projectId?: number) => {
  let taskCode = taskId.toString();
  if (projectId) {
    const project = await db.projects.get(projectId);
    if (project) {
      taskCode = `${project.code}-${taskId}`;
    }
  }
  return taskCode;
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

const dangerouslyDeleteAllTasks = async () => {
  return db.tasks.clear();
};

export {
  createTask,
  dangerouslyDeleteAllTasks,
  deleteTask,
  getAllTasks,
  getTaskById,
  getTasksByDate,
  getTasksByProject,
  updateTask,
};
