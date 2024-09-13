import dayjs from 'dayjs';
import db from '../db';
import { Task, TaskCreateInput, TaskUpdateInput } from '../interfaces/Task';
import { startTimer } from './timerService';

const getAllTasks = async () => {
  return db.tasks.toArray();
};

const getTasksByDate = async (date: dayjs.Dayjs) => {
  return db.tasks
    .where('createdAt')
    .between(date.startOf('day').toDate(), date.endOf('day').toDate())
    .toArray();
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
    newTask.code = taskCode;

    return newTask as Task;
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
