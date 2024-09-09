import db from '../db';

const startTimer = async ({ taskId }: { taskId: number }) => {
  const task = await db.tasks.get(taskId);
  if (!task) {
    throw new Error('Task not found');
  }
  if (task.timers[task.timers.length - 1].end === undefined) {
    throw new Error('Timer already started');
  }
  task.timers.push({ start: new Date(), end: undefined });
  return db.tasks.update(taskId, { timers: task.timers });
};

const endTimer = async ({ taskId }: { taskId: number }) => {
  const task = await db.tasks.get(taskId);
  if (!task) {
    throw new Error('Task not found');
  }
  if (task.timers[task.timers.length - 1].end !== undefined) {
    throw new Error('Timer already ended');
  }
  task.timers[task.timers.length - 1].end = new Date();
  return db.tasks.update(taskId, { timers: task.timers });
};
