import db from '../db';
import { TimerCreateInput } from '../interfaces/Timer';

const startTimer = async ({ taskId }: { taskId: number }) => {
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

const endTimer = async ({ taskId }: { taskId: number }) => {
  const task = await db.tasks.get(taskId);
  if (!task) {
    throw new Error('Task not found');
  }
  const timer = await db.timers.where('taskId').equals(taskId).last();

  if (!timer) {
    throw new Error('Timer not found');
  }

  return db.timers.update(timer.id, {
    end: new Date(),
  });
};

const getTimersByTaskId = async (taskId: number) => {
  return db.timers.where('taskId').equals(taskId).toArray();
};

export { endTimer, getTimersByTaskId, startTimer };
