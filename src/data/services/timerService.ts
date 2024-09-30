import db from '../db';
import { TaskStatus } from '../interfaces/Task';
import { TimerCreateInput } from '../interfaces/Timer';

const startTimer = async (taskId: number) => {
  const task = await db.tasks.get(taskId);
  if (!task) {
    throw new Error('Task not found');
  }
  const newTimer: TimerCreateInput = {
    start: new Date(),
    taskId,
  };

  return db.timers.add(newTimer);
};

const updateTimerEnd = async (timerId: number) => {
  await db.timers.update(timerId, {
    end: new Date(),
  });
};

const updateTaskStatus = async (taskId: number) => {
  await db.tasks.update(taskId, {
    status: TaskStatus.FINISHED,
    lastEndedAt: new Date().toISOString(),
  });
};

const stopTimer = async (taskId: number) => {
  const task = await db.tasks.get(taskId);
  if (!task) {
    throw new Error('Task not found');
  }
  const timer = await db.timers.where('taskId').equals(taskId).last();

  if (!timer) {
    throw new Error('Timer not found');
  }

  try {
    await updateTimerEnd(timer.id);
    await updateTaskStatus(taskId);
  } catch (error) {
    console.error('Error stopping timer:', error);
    throw new Error('Failed to stop timer');
  }
};

const getTimersByTaskId = async (taskId: number) => {
  return db.timers.where('taskId').equals(taskId).toArray();
};

const getLatestTimerByTaskId = async (taskId: number) => {
  return db.timers.where('taskId').equals(taskId).last();
};

const deleteTimers = async (taskId: number) => {
  return db.timers.where('taskId').equals(taskId).delete();
};

export {
  deleteTimers,
  getLatestTimerByTaskId,
  getTimersByTaskId,
  startTimer,
  stopTimer,
};
