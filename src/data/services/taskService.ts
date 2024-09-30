import dayjs from 'dayjs';
import { attachInfoToTasks } from '../../utils/exportUtils';
import db from '../db';
import {
  Task,
  TaskCreateInput,
  TaskExtended,
  TaskStatus,
  TaskUpdateInput,
} from '../interfaces/Task';
import { deleteTimers, startTimer } from './timerService';

const getAllTasks = async () => {
  return db.tasks.toArray();
};

const getTasksByDate = async (date: dayjs.Dayjs) => {
  const tasks = await db.tasks
    .where('status')
    .equals(TaskStatus.ACTIVE)
    .or('status')
    .equals(TaskStatus.FINISHED)
    .and(
      (task) =>
        dayjs(task.lastEndedAt).format('YYYY-MM-DD') ===
        date.format('YYYY-MM-DD'),
    )
    .toArray();
  // TODO: check fusi orari

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

const getLastTask = async () => {
  return db.tasks.orderBy('id').last();
};

const getOngoingTask = async () => {
  const lastTask = await getLastTask();
  if (!lastTask) return null;

  if (lastTask.status === TaskStatus.FINISHED) return null;

  await attachInfoToTasks([lastTask]);
  return lastTask as TaskExtended;
};

const createTask = async ({ description, projectId }: TaskCreateInput) => {
  try {
    if (!description?.trim()) {
      throw new Error('Description is required');
    }
    if (typeof projectId === 'string') {
      projectId = Number(projectId);
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
  const newTask: TaskCreateInput & { id?: number; status: TaskStatus } = {
    description,
    projectId,
    code: '', // Temporary code
    createdAt: dayjs().format('YYYY-MM-DD'),
    status: TaskStatus.ACTIVE,
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
  await deleteTimers(id);
  return db.tasks.delete(id);
};

const dangerouslyDeleteAllTasks = async () => {
  await db.timers.clear();
  return db.tasks.clear();
};

export {
  createTask,
  dangerouslyDeleteAllTasks,
  deleteTask,
  getAllTasks,
  getLastTask,
  getOngoingTask,
  getTaskById,
  getTasksByDate,
  getTasksByProject,
  updateTask,
};
